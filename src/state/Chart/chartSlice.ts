import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartNode } from "@/types/chart/nodes";
import { EdgeType } from "@/types/chart/edges";
import { RootState } from "@/state/store";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import getNewChart from "@/base/chart";
import { isEqual } from "lodash";

interface ChartState {
  nodes: ChartNode[];
  edges: EdgeType[];
  timestamp: number;
}

interface ChartHistoryState {
  history: ChartState[];
  currentIndex: number;
  undoLimit: number;
  historyLockUntil: number | null; // ⏳ Prevents edits for a short period after undo/redo
  historyCooldownMs: number; // ⏳ Configurable cooldown period
}

const initialState: ChartHistoryState = {
  history: [{ ...getNewChart(), timestamp: Date.now() }],
  currentIndex: 0,
  undoLimit: 100,
  historyLockUntil: null,
  historyCooldownMs: 500, // 🕒 1-second cooldown after undo/redo
};

// ✅ Only allow a new history entry if it's a true user edit
const pushToHistory = (
  state: ChartHistoryState,
  newEntry: { nodes: ChartNode[]; edges: EdgeType[] }
) => {
  const newTimestamp = Date.now();

  // ⏳ Skip history updates during the cooldown period
  if (state.historyLockUntil && newTimestamp < state.historyLockUntil) {
    // console.log("⏳ Skipping history update (Cooldown active)");
    return;
  }

  const latest = state.history[state.currentIndex];

  // 🔹 Prevent duplicate states
  if (isEqual({ nodes: latest.nodes, edges: latest.edges }, newEntry)) {
    // console.log("🔄 Skipping duplicate state.");
    return;
  }

  // ✅ If this edit is NOT caused by undo/redo, clear redo history
  if (state.currentIndex < state.history.length - 1) {
    // console.log("✂️ Clearing redo history (User Edit Detected)");
    state.history = state.history.slice(0, state.currentIndex + 1);
  }

  // ✅ Maintain undo limit
  if (state.history.length >= state.undoLimit) {
    state.history.shift();
    state.currentIndex--; // Adjust index after shift
  }

  // ✅ Add new entry
  state.history.push({ ...newEntry, timestamp: newTimestamp });
  state.currentIndex = state.history.length - 1;
  state.historyLockUntil = null; // Reset cooldown
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    onNodesChange: (state, action) => {
      const updatedNodes = applyNodeChanges(
        action.payload,
        state.history[state.currentIndex].nodes
      );
      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },
    onEdgesChange: (state, action) => {
      const updatedEdges = applyEdgeChanges(
        action.payload,
        state.history[state.currentIndex].edges
      );
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
      });
    },
    onConnect: (state, action) => {
      const updatedEdges = addEdge(
        action.payload,
        state.history[state.currentIndex].edges
      );
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
      });
    },
    onSelectNode: (state, action) => {
      const { id, modifierKeys } = action.payload;
      const updatedNodes = state.history[state.currentIndex].nodes.map(
        (node) => ({
          ...node,
          selected:
            node.id === id
              ? !node.selected
              : !modifierKeys?.ctrl
              ? false
              : node.selected,
        })
      );
      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },
    updateNodeOrder: (state, action) => {
      pushToHistory(state, {
        nodes: action.payload,
        edges: state.history[state.currentIndex].edges,
      });
    },
    createNode: (state, action) => {
      const newNode = action.payload;
      const updatedNodes = [
        ...state.history[state.currentIndex].nodes.map((node) => ({
          ...node,
          selected: false,
        })),
        newNode,
      ];
      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },
    updateNode: (state, action) => {
      const updatedNodes = state.history[state.currentIndex].nodes.map((node) =>
        node.id === action.payload.id ? action.payload : node
      );
      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },
    updateNodes: (state, action) => {
      const updatedNodes = state.history[state.currentIndex].nodes.map(
        (node) => {
          const updatedNode = action.payload.find(
            (newNode: ChartNode) => newNode.id === node.id
          );
          return updatedNode
            ? {
                ...node,
                ...updatedNode,
                data: {
                  ...node.data,
                  ...updatedNode.data,
                },
              }
            : node;
        }
      );
      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },
    deleteNodes: (state, action: PayloadAction<ChartNode[]> | undefined) => {
      let updatedNodes = state.history[state.currentIndex].nodes;
      if (action?.payload) {
        const idsToDelete = new Set(action.payload.map((node) => node.id));
        updatedNodes = updatedNodes.filter((node) => !idsToDelete.has(node.id));
      } else {
        updatedNodes = state.history[state.currentIndex].nodes.filter(
          (node) => !node.selected
        );
      }

      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },
    updateNodeData: (state, action) => {
      const updatedNodes = state.history[state.currentIndex].nodes.map((node) =>
        node.id === action.payload.id
          ? { ...node, data: { ...node.data, ...action.payload.data } }
          : node
      );
      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },
    replaceChart: (state, action) => {
      const newEntry = {
        nodes: action.payload.nodes,
        edges: action.payload.edges,
      };
      pushToHistory(state, { nodes: newEntry.nodes, edges: newEntry.edges });
    },
    undo: (state) => {
      if (state.currentIndex > 0) {
        // console.log("↩️ UNDO Fired!");
        state.currentIndex--;
        state.historyLockUntil = Date.now() + state.historyCooldownMs; // 🕒 Start cooldown
      }
    },
    redo: (state) => {
      if (state.currentIndex < state.history.length - 1) {
        // console.log("🔁 REDO Fired!");
        state.currentIndex++;
        state.historyLockUntil = Date.now() + state.historyCooldownMs; // 🕒 Start cooldown
      }
    },
  },
});

export const {
  onNodesChange,
  onEdgesChange,
  onConnect,
  onSelectNode,
  updateNodeOrder,
  createNode,
  updateNode,
  updateNodes,
  deleteNodes,
  updateNodeData,
  replaceChart,
  undo,
  redo,
} = chartSlice.actions;

export const selectChart = (state: RootState): ChartState =>
  state.chart.history[state.chart.currentIndex];
export const selectNodes = (state: RootState): ChartNode[] =>
  state.chart.history[state.chart.currentIndex].nodes;
export const selectEdges = (state: RootState): EdgeType[] =>
  state.chart.history[state.chart.currentIndex].edges;

export const selectChartHistory = (state: RootState): ChartState[] =>
  state.chart.history;

export default chartSlice.reducer;
