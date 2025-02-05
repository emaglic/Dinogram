import { ChartNode } from "@/types/chart/nodes";
import getBaseNode from "./baseNode";
import shapeMap from "@/map/shape-map";

const getNewRichTextNode = (nodes: ChartNode[]) => {
  const baseNode = getBaseNode(nodes);
  return {
    ...baseNode,
    width: 400,
    height: 200,
    data: {
      ...baseNode.data,
      iconKey: "text",
      label: `Rich Text ${nodes.length}`,
    },
    type: "richText",
  };
};

export default getNewRichTextNode;
