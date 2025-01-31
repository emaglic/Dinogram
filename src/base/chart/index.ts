import { EdgeType } from "@/components/Layout/Chart/types/edge";
import { ChartNode } from "@/components/Layout/Chart/types/node";

const getNewChart = () => {
  return {
    nodes: <ChartNode[]>[],
    edges: <EdgeType[]>[],
  };
};

export default getNewChart;
