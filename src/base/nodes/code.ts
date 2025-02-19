import getBaseNode from "./baseNode";
import { ChartNode } from "@/types/chart/nodes";
import { getDefaultThemeModeColor } from "../utils";

const getNewCodeNode = (nodes: ChartNode[]) => {
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
      code: {
        value: "",
        language: "plaintext",
      },
      label: `Code [${nodes.length}]`,
      iconKey: "code",
      stroke: {
        width: 0,
        color: getDefaultThemeModeColor(),
        opacity: 100,
      },
    },
    type: "code",
  };
};

export default getNewCodeNode;
