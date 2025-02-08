import { v4 as uuidv4 } from "uuid";
import getBaseNode from "./baseNode";
import { ChartNode } from "@/types/chart/nodes";
import { ShapeNodeData } from "@/types/chart/nodes/shape";
import shapeMap from "@/map/shape-map";

const getNewTextNode = (nodes: ChartNode[]) => {
  const baseNode = getBaseNode(nodes);

  return {
    ...baseNode,
    width: 50,
    height: 50,
    data: {
      ...baseNode.data,
      baseNodeComponent: {
        showHeader: false,
        autoSize: true,
      },
      label: `Text [${nodes.length}]`,
      iconKey: "text",
      text: {
        size: "h1",
        color: "#000000",
        opacity: 100,
      },
      fill: {
        color: "#ffffff",
        opacity: 100,
      },
      stroke: {
        width: 0,
        color: "#000000",
        opacity: 100,
      },
    },
    type: "text",
  };
};

export default getNewTextNode;
