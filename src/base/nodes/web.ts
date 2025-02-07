import { ChartNode } from "@/types/chart/nodes";
import getBaseNode from "./baseNode";
import shapeMap from "@/map/shape-map";

const getNewWebNode = (nodes: ChartNode[]) => {
  const baseNode = getBaseNode(nodes);
  return {
    ...baseNode,
    width: 400,
    height: 200,
    data: {
      ...baseNode.data,
      iconKey: "web",
      label: `Web [${nodes.length}]`,
      src: "https://eben.design",
    },
    type: "web",
  };
};

export default getNewWebNode;
