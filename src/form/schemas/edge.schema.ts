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
    data: {
      type: "object",
      properties: {
        pathType: {
          type: "string",
          description: "Please select the variant of the edge",
          // enum: ["straight", "bezier", "simpleBezier", "smoothStep"],
          enum: [
            { value: "straight", label: "Straight" },
            { value: "bezier", label: "Bezier" },
            { value: "simpleBezier", label: "Simple Bezier" },
            { value: "smoothStep", label: "Smooth Step" },
          ],
        },
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
        stroke: {
          type: "object",
          properties: {
            color: {
              type: "string",
              description: "Please provide a stroke color",
              options: {
                updateType: "onChange",
              },
            },
            width: {
              type: "number",
              description: "Please provide a stroke width",
              options: {
                updateType: "onChange",
              },
            },
            opacity: {
              type: "number",
              description: "Please provide a stroke opacity",
              options: {
                updateType: "onChange",
              },
            },
          },
        },
      },
    },
  },
};
