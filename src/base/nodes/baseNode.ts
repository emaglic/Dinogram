import { v4 as uuidv4 } from "uuid";

const getBaseNode = (nodes) => {
  return {
    id: uuidv4(),
    position: { x: 0, y: 0 },
    data: {
      zIndex: nodes.length,
      type: "node",
      visible: true,
      locked: false,
    },
    selected: true,
  };
};

export default getBaseNode;
