const getToDuplicate = (nodes, edges, payload) => {
  let wrappedPayload = null;
  if (payload) {
    if (Array.isArray(payload)) wrappedPayload = payload;
    else wrappedPayload = [payload];
  }

  const payloadNodes = wrappedPayload
    ? wrappedPayload.filter((item) => item.data.type === "node")
    : [];
  const payloadEdges = wrappedPayload
    ? wrappedPayload.filter((item) => item.data.type === "edge")
    : [];

  const newNodes = [...nodes, ...payloadNodes];
  const newEdges = [...edges, ...payloadEdges];

  const dedupedNodes = [
    ...new Map(newNodes.map((item) => [item.id, item])).values(),
  ];
  const dedupedEdges = [
    ...new Map(newEdges.map((item) => [item.id, item])).values(),
  ];

  const ret = [dedupedNodes, dedupedEdges];

  console.log("getToDuplicate", ret);

  return ret;
};

export default getToDuplicate;
