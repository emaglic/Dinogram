const handleUpdateDimensions = (payload, currentNodes) => {
  if (payload.some((node) => node.type === "dimensions" && node.resizing)) {
    const resizingPayload = payload.find(
      (node) => node.type === "dimensions" && node.resizing
    );
    const positioningPayload = payload.find((node) => node.type === "position");

    const resizingNode = currentNodes.find((node) => node.id === payload[0].id);

    const { width: oWidth, height: oHeight } = resizingPayload.dimensions;
    const { width: nWidth, height: nHeight } = resizingNode;
    const width = oWidth - nWidth;
    const height = oHeight - nHeight;

    const { x: oX, y: oY } = positioningPayload?.position || {
      x: null,
      y: null,
    };
    const { x: nX, y: nY } = resizingNode.position;
    const x = oX ? oX - nX : 0;
    const y = oX ? oY - nY : 0;

    const updatedNodes = currentNodes.map((node) =>
      node.selected && node.id !== resizingNode.id
        ? {
            ...node,
            width: node.width + width,
            height: node.height + height,
            position: {
              x: node.position.x + x,
              y: node.position.y + y,
            },
          }
        : node
    );

    return updatedNodes;
  } else {
    return currentNodes;
  }
};

export default handleUpdateDimensions;
