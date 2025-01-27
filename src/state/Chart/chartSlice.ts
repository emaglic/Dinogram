import { createSlice } from "@reduxjs/toolkit";
import { ChartNode } from "../../components/Layout/Chart/types/node";
import { setNodes } from "slate";

const initialNodes: ChartNode[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Nintendo.com", src: "https://www.nintendo.com" },
    type: "web",
  },
  {
    id: "2",
    position: { x: 500, y: 0 },
    data: { label: "My Text" },
    type: "richText",
  },
];

interface ChartSlice {
  nodes: ChartNode[];
}

const initialState: ChartSlice = {
  nodes: initialNodes,
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
  },
});

export default chartSlice.reducer;
