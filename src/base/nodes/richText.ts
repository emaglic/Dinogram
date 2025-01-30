import getBaseNode from "./baseNode";

const getNewRichTextNode = (nodes) => {
  const baseNode = getBaseNode(nodes);
  return {
    ...baseNode,
    data: {
      ...baseNode.data,
      label: `Rich Text ${nodes.length}`,
    },
    type: "richText",
  };
};

export default getNewRichTextNode;
