import { createSlice } from "@reduxjs/toolkit";
import { ChartNode } from "@/types/chart/nodes";
import { EdgeType } from "@/types/chart/edges";
import { RootState } from "@/state/store";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import getNewChart from "@/base/chart";

interface ChartHistoryState {
  history: { nodes: ChartNode[]; edges: EdgeType[]; timestamp: number }[]; // ⏳ Add timestamp
  currentIndex: number;
  undoLimit: number;
}

const initialState: ChartHistoryState = {
  history: [getNewChart()], // Start with an initial chart state
  currentIndex: 0,
  undoLimit: 100,
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
    return; // 🚨 Don't add identical state to history
  }

  // 🚀 Preserve redo history unless making a NEW change
  if (state.currentIndex < state.history.length - 1) {
    state.history = state.history.slice(0, state.currentIndex + 1);
  }

  // 🔹 If history exceeds the limit, remove the oldest entry
  if (state.history.length >= state.undoLimit) {
    state.history.shift();
    state.currentIndex--; // 🔹 Adjust index to match the new history length
  }

  // ✅ Add new entry with a timestamp
  state.history.push({ ...newEntry, timestamp: newTimestamp });
  state.currentIndex = state.history.length - 1;
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
        state.currentIndex--; // ✅ Only move the index, do not modify history
      }
    },

    redo: (state) => {
      if (state.currentIndex < state.history.length - 1) {
        state.currentIndex++; // ✅ Only move index, do not modify history
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
  updateNodeData,
  replaceChart,
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
