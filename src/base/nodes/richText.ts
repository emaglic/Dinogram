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
      baseNodeComponent: {
        showHeader: true,
      },
      iconKey: "richText",
      label: `Rich Text [${nodes.length}]`,
      content: "",
    },
    type: "richText",
  };
};

export default getNewRichTextNode;
