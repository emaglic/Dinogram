import { EdgeType } from "@/types/chart/edges";
import { ChartNode } from "@/types/chart/nodes";

const getNewChart = () => {
  return {
    nodes: <ChartNode[]>[],
    edges: <EdgeType[]>[],
    timestamp: Date.now(),
  };
};

export default getNewChart;
