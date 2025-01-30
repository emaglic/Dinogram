import ShapeMap from "@/map/shape-map";
import getNewRichTextNode from "./richText";
import getNewShapeNode from "./shape";
import getNewWebNode from "./web";
import { NodeIconMap } from "@/map/icon-map";

/**
 * Get a new node based on the type
 * @param {string} type - The type of node to create
 * @param {Array} nodes - The current nodes in the chart (redux)
 */
/* const getNewNode(type, nodes) => {
    switch(type) {
        case 'richText': return getNewRichTextNode(nodes);
        case 'web': return getNewWebNode(nodes);
    }
}

export default getNewNode; */

const getNodesTypes = () => {
  return [
    {
      type: "richText",
      label: "Rich Text",
      icon: NodeIconMap["richText"],
      defaultData: getNewRichTextNode,
    },
    {
      type: "web",
      label: "Web",
      icon: NodeIconMap["web"],
      defaultData: getNewWebNode,
    },

    ...getShapes(),
  ];
};

const getShapes = () => {
  return Object.values(ShapeMap).map((shape) => {
    return {
      type: "shape",
      label: shape.label,
      icon: shape.icon,
      key: shape.key,
      defaultData: getNewShapeNode,
    };
  });
};

export default getNodesTypes;
