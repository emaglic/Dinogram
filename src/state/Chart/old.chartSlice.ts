import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { ChartNode } from "@/types/chart/nodes";
import { EdgeType } from "@/types/chart/edges";
import { RootState } from "@/state/store";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import { node } from "slate";
import getNewChart from "@/base/chart";

const initialNodes: ChartNode[] = [
  /* {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      label: "Nintendo.com",
      src: "https://eben.design",
      zIndex: 0,
      type: "node",
      visible: true,
      locked: false,
    },
    type: "web",
    selected: false,
  },
  {
    id: "2",
    position: { x: 0, y: 0 },
    data: {
      label: "My Text",
      zIndex: 1,
      type: "node",
      visible: true,
      locked: false,
    },
    type: "richText",
    selected: false,
  },
  {
    id: "3",
    position: { x: 10, y: 0 },
    data: {
      label: "Google.com",
      src: "https://google.com",
      zIndex: 2,
      type: "node",
      visible: true,
      locked: false,
    },
    type: "web",
    selected: false,
  },
  {
    id: "4",
    position: { x: 20, y: 0 },
    data: {
      label: "Apple.com",
      src: "https://apple.com",
      zIndex: 3,
      type: "node",
      visible: true,
      locked: false,
    },
    type: "web",
    selected: false,
  }, */
];

interface ChartSlice {
  nodes: ChartNode[];
  edges: EdgeType[];
}

const initialState: ChartSlice = getNewChart();

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    onNodesChange: (state, action) => {
      // console.log("action.payload: ", action.payload);
      const a = applyNodeChanges(action.payload, state.nodes);
      state.nodes = a;
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    onSelectNode: (state, action) => {
      const id = action.payload.id;
      const modifierKeys = action.payload.modifierKeys;
      state.nodes = state.nodes.map((node) => {
        if (node.id === id) {
          node.selected = !node.selected;
        } else {
          if (!modifierKeys?.ctrl) {
            node.selected = false;
          }
        }
        return node;
      });
    },
    replaceChart: (state, action) => {
      return action.payload;
    },
    createNode: (state, action) => {
      state.nodes = [
        ...state.nodes.map((node) => ({ ...node, selected: false })),
        action.payload,
      ];
    },
    updateNodeOrder: (state, action) => {
      state.nodes = action.payload;
    },
    updateNodes: (state, action) => {
      state.nodes = state.nodes.map((node) => {
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
      });
    },
    updateNode: (state, action) => {
      state.nodes = state.nodes.map((node) => {
        if (node.id === action.payload.id) {
          return action.payload;
        }
        return node;
      });
    },
    updateNodeData: (state, action) => {
      state.nodes = state.nodes.map((node) => {
        if (node.id === action.payload.id) {
          node.data = {
            ...node.data,
            ...action.payload.data,
          };
        }
        return node;
      });
    },
  },
});

export const {
  onNodesChange,
  onEdgesChange,
  onConnect,
  onSelectNode,
  updateNodeOrder,
  updateNodes,
  updateNode,
  updateNodeData,
  createNode,
  replaceChart,
} = chartSlice.actions;

/* const _selectNodes = (state: RootState) => state.chart.nodes;
export const selectNodes = createSelector([_selectNodes], (nodes) => {
  return sortNodes(nodes);
}); */

export const selectNodes = (state: RootState) => state.chart.nodes;
export const selectEdges = (state: RootState) => state.chart.edges;
export const selectChart = (state: RootState) => state.chart;
export default chartSlice.reducer;
