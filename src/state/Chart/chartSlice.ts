import { createSlice } from "@reduxjs/toolkit";
import { ChartNode } from "@/types/chart/nodes";
import { EdgeType } from "@/types/chart/edges";
import { RootState } from "@/state/store";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import getNewChart from "@/base/chart";

interface ChartHistoryState {
  history: { nodes: ChartNode[]; edges: EdgeType[]; timestamp: number }[]; // ⏳ Add timestamp
  currentIndex: number;
  isHistoryChange: boolean;
}

const initialState: ChartHistoryState = {
  history: [getNewChart()], // Start with an initial chart state
  currentIndex: 0,
  isHistoryChange: false,
};

const shouldSkipHistoryUpdate = (state: ChartHistoryState) => {
  if (state.isHistoryChange) {
    //state.isHistoryChange = false; // Reset flag
    return true; // Signal that history update should be skipped
  }
  return false;
};

const pushToHistory = (
  state: ChartHistoryState,
  newEntry: { nodes: ChartNode[]; edges: EdgeType[] }
) => {
  const newTimestamp = Date.now();

  // 🚀 Check if the new state is already in history (not just last entry)
  const isDuplicate = state.history.some(
    (entry) =>
      JSON.stringify(entry.nodes) === JSON.stringify(newEntry.nodes) &&
      JSON.stringify(entry.edges) === JSON.stringify(newEntry.edges)
  );

  if (isDuplicate) {
    //console.log("🔁 SKIPPING: Identical state already exists in history.");
    return; // 🚨 Don't add identical state to history
  }

  // 🚀 Preserve redo history unless making a NEW change
  if (state.currentIndex < state.history.length - 1) {
    //console.log("✂️ TRUNCATING Future History (New Change Detected)");
    state.history = state.history.slice(0, state.currentIndex + 1);
  }

  // ✅ Add new entry with a timestamp
  state.history.push({ ...newEntry, timestamp: newTimestamp });
  state.currentIndex = state.history.length - 1;

  //console.log("✅ AFTER Push - Current Index:", state.currentIndex);
  //console.log("✅ AFTER Push - History Length:", state.history.length);
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    onNodesChange: (state, action) => {
      if (shouldSkipHistoryUpdate(state)) return;

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
      if (shouldSkipHistoryUpdate(state)) return;

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
      if (shouldSkipHistoryUpdate(state)) return;

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
      if (shouldSkipHistoryUpdate(state)) return;

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
      if (shouldSkipHistoryUpdate(state)) return;

      pushToHistory(state, {
        nodes: action.payload,
        edges: state.history[state.currentIndex].edges,
      });
    },

    createNode: (state, action) => {
      if (shouldSkipHistoryUpdate(state)) return;
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
      if (shouldSkipHistoryUpdate(state)) return;
      const updatedNodes = state.history[state.currentIndex].nodes.map((node) =>
        node.id === action.payload.id ? action.payload : node
      );

      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },
    updateNodes: (state, action) => {
      if (shouldSkipHistoryUpdate(state)) return;
      const updatedNodes = state.history[state.currentIndex].nodes.map(
        (node) => {
          const updatedNode = action.payload.find(
            (newNode) => newNode.id === node.id
          );
          return updatedNode
            ? {
                ...node,
                ...updatedNode, // Spread top-level properties
                data: {
                  ...node.data, // Preserve existing data
                  ...updatedNode.data, // Override only updated fields
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
    updateNodeData: (state, action) => {
      if (shouldSkipHistoryUpdate(state)) return;
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
      if (shouldSkipHistoryUpdate(state)) return;
      const newEntry = {
        nodes: action.payload.nodes,
        edges: action.payload.edges,
      };

      pushToHistory(state, { nodes: newEntry.nodes, edges: newEntry.edges });
    },

    /* updateHistory: (state) => {
      if (shouldSkipHistoryUpdate(state)) return;
      const newHistory = [
        ...state.history.slice(0, state.currentIndex + 1),
        {
          nodes: state.history[state.currentIndex].nodes,
          edges: state.history[state.currentIndex].edges,
        },
      ];

      if (newHistory.length > 10) {
        newHistory.shift(); // Keep within limit
      }

      state.history = newHistory;
      state.currentIndex = newHistory.length - 1;
    }, */
    undo: (state) => {
      /* console.log(
        "↩️ UNDO Fired!",
        "Current Index:",
        state.currentIndex,
        "History Length:",
        state.history.length
      ); */

      if (state.currentIndex > 0) {
        state.currentIndex--; // ✅ Only move the index, do not modify history
      }

      /* console.log(
        "After Undo - Current Index:",
        state.currentIndex,
        "History Length:",
        state.history.length
      ); */
    },

    redo: (state) => {
      /* console.log(
        "🔁 REDO Fired!",
        "Current Index:",
        state.currentIndex,
        "History Length:",
        state.history.length
      ); */

      if (state.currentIndex < state.history.length - 1) {
        state.currentIndex++; // ✅ Only move index, do not modify history
      }

      /* console.log(
        "After Redo - Current Index:",
        state.currentIndex,
        "History Length:",
        state.history.length
      ); */
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
  updateNodeData,
  replaceChart,
  updateHistory,
  undo,
  redo,
} = chartSlice.actions;

export const selectChart = (state: RootState) =>
  state.chart.history[state.chart.currentIndex];
export const selectNodes = (state: RootState) =>
  state.chart.history[state.chart.currentIndex].nodes;
export const selectEdges = (state: RootState) =>
  state.chart.history[state.chart.currentIndex].edges;

export const selectChartHistory = (state: RootState) => state.chart.history;
export default chartSlice.reducer;
