import getBaseNode from "./baseNode";
import { ChartNode } from "@/types/chart/nodes";
import { getDefaultThemeModeColor } from "../utils";

const getNewImageNode = (nodes: ChartNode[]) => {
  const baseNode = getBaseNode(nodes);

  return {
    ...baseNode,
    width: 200,
    height: 200,
    data: {
      ...baseNode.data,
      baseNodeComponent: {
        showHeader: false,
        autoSize: true,
      },
      image: {
        src: "",
        size: "contain",
      },
      label: `Image [${nodes.length}]`,
      iconKey: "image",
      stroke: {
        width: 0,
        color: getDefaultThemeModeColor(),
        opacity: 100,
      },
    },
    type: "image",
  };
};

export default getNewImageNode;
