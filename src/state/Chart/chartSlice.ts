import { createSlice } from "@reduxjs/toolkit";
import { ChartNode } from "../../components/Layout/Chart/types/node";
import { EdgeType } from "@/components/Layout/Chart/types/edge";
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

const sortNodes = (nodes) => {
  return [...nodes].sort((a, b) => a.data.zIndex - b.data.zIndex);
};

const initialNodes: ChartNode[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      label: "Nintendo.com",
      src: "https://eben.design",
      zIndex: 1,
      type: "node",
    },
    type: "web",
    selected: false,
  },
  {
    id: "2",
    position: { x: 0, y: 0 },
    data: { label: "My Text", zIndex: 2, type: "node" },
    type: "richText",
    selected: false,
  },
  {
    id: "3",
    position: { x: 10, y: 0 },
    data: {
      label: "Google.com",
      src: "https://google.com",
      zIndex: 3,
      type: "node",
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
    },
    type: "web",
    selected: false,
  },
];

interface ChartSlice {
  nodes: ChartNode[];
  edges: EdgeType[];
}

const initialState: ChartSlice = {
  nodes: initialNodes,
  edges: [],
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    onNodesChange: (state, action) => {
      const a = applyNodeChanges(action.payload, state.nodes);
      state.nodes = sortNodes(a);
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    onSelectNode: (state, action) => {
      console.log("action: ", action);

      state.nodes = state.nodes.map((node) => {
        if (node.id === action.payload.id) {
          node.selected = !node.selected;
        }
        return node;
      });
    },
    updateNodeOrder: (state, action) => {
      console.log("action.payload: ", action.payload);
      state.nodes = action.payload;
    },
    updateNodeProperties: (state, action) => {
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
  updateNodeProperties,
} = chartSlice.actions;
export const selectNodes = (state: RootState) => state.chart.nodes;
export const selectEdges = (state: RootState) => state.chart.edges;
export default chartSlice.reducer;
