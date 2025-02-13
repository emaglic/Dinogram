import { ChartNode } from "@/types/chart/nodes";
import { v4 as uuidv4 } from "uuid";

const getBaseEdge = (edges: EdgeNode[]) => {
  return {
    id: uuidv4(),
    data: {
      label: `Line ${edges.length}`,
      iconKey: "airlineStopsIcon",
      zIndex: edges.length,
      showBaseNodeHeader: false,
      type: "edge",
      visible: true,
      locked: false,
    },
    selected: true,
  };
};

export default getBaseEdge;
