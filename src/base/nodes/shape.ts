import { v4 as uuidv4 } from "uuid";
import getBaseNode from "./baseNode";
import { getDefaultThemeModeColor } from "../utils";
import { ChartNode } from "@/types/chart/nodes";
import { ShapeNodeData } from "@/types/chart/nodes/shape";

const getNewShapeNode = (nodes: ChartNode[], shape: ShapeNodeData) => {
  const baseNode = getBaseNode(nodes);

  return {
    ...baseNode,
    width: 100,
    height: 100,
    data: {
      ...baseNode.data,
      baseNodeComponent: {
        showHeader: false,
      },
      showLabel: false,
      label: `${shape.label} [${nodes.length}]`,
      // shape: shape.key,
      iconKey: shape.key,
      fill: {
        color: getDefaultThemeModeColor(),
        opacity: 100,
      },
      stroke: {
        width: 0,
        color: getDefaultThemeModeColor(),
        opacity: 100,
      },
    },
    type: "shape",
  };
};

export default getNewShapeNode;
