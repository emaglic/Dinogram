import getBaseNode from "./baseNode";
import { ChartNode } from "@/types/chart/nodes";
import { getDefaultThemeModeColor } from "../utils";

const getNewDrawingNode = (nodes: ChartNode[]) => {
  const baseNode = getBaseNode(nodes);

  return {
    ...baseNode,
    width: 640,
    height: 360,
    data: {
      ...baseNode.data,
      baseNodeComponent: {
        showHeader: false,
      },
      drawing: {
        base64: null,
        backgroundColor: getDefaultThemeModeColor(),
        displayBackgroundColor: true,
      },
      label: `Drawing [${nodes.length}]`,
      iconKey: "draw",
      stroke: {
        width: 0,
        color: getDefaultThemeModeColor(),
        opacity: 100,
      },
    },
    type: "drawing",
  };
};

export default getNewDrawingNode;
