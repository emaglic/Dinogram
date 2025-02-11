import { v4 as uuidv4 } from "uuid";
import getBaseNode from "./baseNode";
import { ChartNode } from "@/types/chart/nodes";
import { ShapeNodeData } from "@/types/chart/nodes/shape";
import shapeMap from "@/map/shape-map";

const getNewShapeNode = (nodes: ChartNode[], shape: ShapeNodeData) => {
  const baseNode = getBaseNode(nodes);

  return {
    ...baseNode,
    width: 50,
    height: 50,
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
        color: "#000000",
        opacity: 100,
      },
      stroke: {
        width: 0,
        color: "#000000",
        opacity: 100,
      },
    },
    type: "shape",
  };
};

export default getNewShapeNode;
