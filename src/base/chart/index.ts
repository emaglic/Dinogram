import { EdgeType } from "@/types/chart/edges";
import { ChartNode } from "@/types/chart/nodes";

const getNewChart = () => {
  return {
    nodes: <ChartNode[]>[],
    edges: <EdgeType[]>[],
  };
};

export default getNewChart;
