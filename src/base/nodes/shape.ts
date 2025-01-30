import { v4 as uuidv4 } from "uuid";
import getBaseNode from "./baseNode";

const getNewShapeNode = (nodes, shape) => {
  console.log("shape: ", shape);
  const baseNode = getBaseNode(nodes);

  return {
    ...baseNode,
    data: {
      ...baseNode.data,
      label: `${shape.label} ${nodes.length}`,
      shape: shape.key,
    },
    type: "shape",
  };
};

export default getNewShapeNode;
