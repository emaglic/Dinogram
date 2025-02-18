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
      pathType: "straight",
      visible: true,
      locked: false,
      stroke: {
        color: "#000000",
        width: 1,
        opacity: 100,
      },
    },
    selected: true,
  };
};

export default getBaseEdge;
