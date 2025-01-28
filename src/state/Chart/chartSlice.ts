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

const initialNodes: ChartNode[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Nintendo.com", src: "https://www.nintendo.com" },
    type: "web",
    selected: false,
  },
  {
    id: "2",
    position: { x: 500, y: 0 },
    data: { label: "My Text" },
    type: "richText",
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
      state.nodes = a;
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action) => {
      state.edges = addEdge(action.payload, state.edges);
    },
  },
});

export const { onNodesChange, onEdgesChange, onConnect } = chartSlice.actions;
export const selectNodes = (state: RootState) => state.chart.nodes;
export const selectEdges = (state: RootState) => state.chart.edges;
export default chartSlice.reducer;
