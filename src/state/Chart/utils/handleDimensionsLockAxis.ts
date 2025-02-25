// Handles locking x and y position movement if payload is of type "position" and dragLockAxis is set.
// The dragLockAxis is set in the main Chart component. It is determined based on the initial drag direction.
// If the user holds the shift key while dragging a node, the dragLockAxis is set to either "x" or "y".
const handleDimensionsLockAxis = (payload, currentNodes, dragLockAxis) => {
  if (payload.type === "dimensions" && payload.resizing && dragLockAxis) {
    // console.log("this is firing");
    const oldPayload = currentNodes.find((node) => node.id === payload.id);
    if (!oldPayload) return payload;

    let newWidth = payload.dimensions.width;
    let newHeight = payload.dimensions.height;

    if (dragLockAxis === "x") {
      const diff = oldPayload.width - newWidth;
      newHeight = oldPayload.height - diff;
    } else if (dragLockAxis === "y") {
      const diff = oldPayload.height - newHeight;
      newWidth = oldPayload.width - diff;
    }

    return {
      ...payload,
      dimensions: {
        width: newWidth,
        height: newHeight,
      },
    };
  }
  return payload;
};

export default handleDimensionsLockAxis;
