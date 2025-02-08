import shapeMap from "@/map/shape-map";
export default {
  properties: {
    data: {
      properties: {
        iconKey: {
          type: "string",
          description: "Please select the shape of the element",
          enum: Object.keys(shapeMap),
        },
        showLabel: {
          type: "boolean",
          description: "Display the label of the element",
        },
        fill: {
          type: "object",
          properties: {
            color: {
              type: "string",
              description: "Please provide a fill color",
            },
            opacity: {
              type: "number",
              description: "Please provide a fill opacity",
            },
          },
        },
        stroke: {
          type: "object",
          properties: {
            color: {
              type: "string",
              description: "Please provide a stroke color",
            },
            width: {
              type: "number",
              description: "Please provide a stroke width",
            },
            opacity: {
              type: "number",
              description: "Please provide a stroke opacity",
            },
          },
        },
      },
    },
  },
};
