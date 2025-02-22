import { ChartEdge } from "@/types/chart/edges";
import { ChartNode } from "@/types/chart/nodes";

const getNewChart = () => {
  return {
    nodes: <ChartNode[]>[],
    edges: <ChartEdge[]>[],
    timestamp: Date.now(),
  };
};

export default getNewChart;
