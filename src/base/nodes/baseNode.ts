import { ChartNode } from "@/types/chart/nodes";
import { v4 as uuidv4 } from "uuid";

const getBaseNode = (nodes: ChartNode[]) => {
  return {
    id: uuidv4(),
    position: { x: 0, y: 0 },
    data: {
      zIndex: nodes.length,
      showBaseNodeHeader: false,
      type: "node",
      visible: true,
      locked: false,
      baseNodeComponent: {
        showHeader: true,
      },
    },
    selected: true,
  };
};

export default getBaseNode;
