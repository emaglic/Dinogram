import { RootState } from "@/state/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { applyNodeChanges } from "@xyflow/react";

// Handles locking x and y position movement if payload is of type "position" and dragLockAxis is set.
// The dragLockAxis is set in the main Chart component. It is determined based on the initial drag direction.
// If the user holds the shift key while dragging a node, the dragLockAxis is set to either "x" or "y".
const handleLockPosition = (payload, currentNodes, dragLockAxis) => {
  if (payload.type === "position" && dragLockAxis) {
    const oldPayload = currentNodes.find((node) => node.id === payload.id);
    if (!oldPayload) return payload;
    return {
      ...payload,
      position: {
        x: dragLockAxis === "y" ? oldPayload.position.x : payload.position.x,
        y: dragLockAxis === "x" ? oldPayload.position.y : payload.position.y,
      },
    };
  }
  return payload;
};

// ✅ Async thunk to handle node changes while accessing another slice
const handleNodesChange = createAsyncThunk(
  "chart/handleNodesChange",
  async (payload, { getState }) => {
    const state: RootState = getState(); // Get full Redux state

    const dragLockAxis = state.settings.dragLockAxis; // ✅ Access "shift" state
    const currentNodes = state.chart.history[state.chart.currentIndex].nodes;
    const currentEdges = state.chart.history[state.chart.currentIndex].edges;

    const updatedPayload = payload.map((p) => {
      let returnValue = handleLockPosition(p, currentNodes, dragLockAxis);
      return returnValue;
    });

    const updatedNodes = applyNodeChanges(updatedPayload, currentNodes);

    return {
      nodes: updatedNodes,
      edges: currentEdges,
    };
  }
);

export default handleNodesChange;
