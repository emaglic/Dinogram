import getBaseNode from "./baseNode";

const getNewWebNode = (nodes) => {
  const baseNode = getBaseNode(nodes);
  return {
    ...baseNode,
    data: {
      ...baseNode.data,
      label: `Web ${nodes.length}`,
      src: "",
    },
    type: "web",
  };
};

export default getNewWebNode;
