import { v4 as uuidv4 } from "uuid";
import { getDefaultThemeModeColor } from "../utils";
import { ChartEdge } from "@/types/chart/edges";

const getBaseEdge = (edges: ChartEdge[]) => {
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
        color: getDefaultThemeModeColor(),
        width: 1,
        opacity: 100,
      },
    },
    selected: true,
  };
};

export default getBaseEdge;
