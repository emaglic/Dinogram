import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartNode } from "@/types/chart/nodes";
import { EdgeType } from "@/types/chart/edges";
import { RootState } from "@/state/store";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import getNewChart from "@/base/chart";
import { create, isEqual } from "lodash";
import getBaseEdge from "@/base/edges/baseEdge";

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
    // Node Reducers
    // ===============================================
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

      // Clear all selected edges when selecting a node
      const updatedEdges = state.history[state.currentIndex].edges.map(
        (edge) => ({
          ...edge,
          selected: false,
        })
      );

      pushToHistory(state, {
        nodes: updatedNodes,
        edges: updatedEdges,
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
          (node) => !node.selected || node.data.locked || !node.data.visible
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

    // Edge Reducers
    // ===============================================
    onConnect: (state, action) => {
      const edges = state.history[state.currentIndex].edges;
      const updatedEdges = addEdge(
        {
          ...action.payload,
          ...getBaseEdge(edges),
          type: "customEdge",
          selected: true,
        },
        state.history[state.currentIndex].edges
      );
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
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
    onSelectEdge: (state, action) => {
      const { id, modifierKeys } = action.payload;
      const updatedEdges = state.history[state.currentIndex].edges.map(
        (edge) => ({
          ...edge,
          selected:
            edge.id === id
              ? !edge.selected
              : !modifierKeys?.ctrl
              ? false
              : edge.selected,
        })
      );

      // Clear all selected nodes when selecting an edge
      const updatedNodes = state.history[state.currentIndex].nodes.map(
        (node) => ({
          ...node,
          selected: false,
        })
      );

      pushToHistory(state, {
        nodes: updatedNodes,
        edges: updatedEdges,
      });
    },
    updateEdgeOrder: (state, action) => {
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: action.payload,
      });
    },
    createEdge: (state, action) => {
      const newEdge = action.payload;
      const updatedEdges = [
        ...state.history[state.currentIndex].edges.map((edge) => ({
          ...edge,
          selected: false,
        })),
        newEdge,
      ];
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
      });
    },
    updateEdge: (state, action) => {
      const updatedEdges = state.history[state.currentIndex].edges.map((edge) =>
        edge.id === action.payload.id ? action.payload : edge
      );
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
      });
    },
    updateEdges: (state, action) => {
      const updatedEdges = state.history[state.currentIndex].edges.map(
        (edge) => {
          const updatedEdge = action.payload.find(
            (newEdge) => newEdge.id === edge.id
          );
          return updatedEdge
            ? {
                ...edge,
                ...updatedEdge,
                data: {
                  ...edge.data,
                  ...updatedEdge.data,
                },
              }
            : edge;
        }
      );
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
      });
    },
    deleteEdges: (state, action) => {
      let updatedEdges = state.history[state.currentIndex].edges;
      if (action?.payload) {
        const idsToDelete = new Set(action.payload.map((edge) => edge.id));
        updatedEdges = updatedEdges.filter((edge) => !idsToDelete.has(edge.id));
      } else {
        updatedEdges = state.history[state.currentIndex].edges.filter(
          (edge) => !edge.selected || edge.data.locked || !edge.data.visible
        );
      }
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
      });
    },
    updateEdgeData: (state, action) => {
      const updatedEdges = state.history[state.currentIndex].edges.map((edge) =>
        edge.id === action.payload.id
          ? { ...edge, data: { ...edge.data, ...action.payload.data } }
          : edge
      );
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
      });
    },

    // Global Actions
    // ===============================================
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
  onSelectNode,
  updateNodeOrder,
  createNode,
  updateNode,
  updateNodes,
  deleteNodes,
  updateNodeData,

  onEdgesChange,
  onConnect,
  onSelectEdge,
  updateEdgeOrder,
  createEdge,
  updateEdge,
  updateEdges,
  deleteEdges,
  updateEdgeData,

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
