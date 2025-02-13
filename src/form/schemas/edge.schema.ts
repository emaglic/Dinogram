/* 
label: `Line ${edges.length}`,
iconKey: "airlineStopsIcon",
zIndex: edges.length,
showBaseNodeHeader: false,
type: "edge",
visible: true,
locked: false,
 */

export default {
  type: "object",
  properties: {
    type: {
      type: "string",
      description: "Please select the variant of the edge",
      enum: ["straight", "bezier", "simpleBezier", "smoothStep"],
    },
    data: {
      type: "object",
      properties: {
        label: {
          type: "string",
          minLength: 1,
          description: "Please enter a label for the edge",
        },
        visible: {
          type: "boolean",
          description: "Please select the visibility of the edge",
        },
        locked: {
          type: "boolean",
          description: "Please select the lock status of the edge",
        },
      },
    },
  },
};
