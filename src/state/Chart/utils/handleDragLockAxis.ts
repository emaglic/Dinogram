// Handles locking x and y position movement if payload is of type "position" and dragLockAxis is set.
// The dragLockAxis is set in the main Chart component. It is determined based on the initial drag direction.
// If the user holds the shift key while dragging a node, the dragLockAxis is set to either "x" or "y".
const handleDragLockAxis = (payload, currentNodes, dragLockAxis) => {
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

export default handleDragLockAxis;
