import getBaseNode from "./baseNode";
import { ChartNode } from "@/types/chart/nodes";
import { getDefaultThemeModeColor } from "../utils";

const getNewVideoNode = (nodes: ChartNode[]) => {
  const baseNode = getBaseNode(nodes);

  return {
    ...baseNode,
    width: 640,
    height: 360,
    data: {
      ...baseNode.data,
      baseNodeComponent: {
        showHeader: true,
      },
      video: {
        src: "",
      },
      label: `Video [${nodes.length}]`,
      iconKey: "movie",
      stroke: {
        width: 0,
        color: getDefaultThemeModeColor(),
        opacity: 100,
      },
    },
    type: "video",
  };
};

export default getNewVideoNode;
