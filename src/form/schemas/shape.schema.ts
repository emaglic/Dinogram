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
              options: {
                updateType: "onChange",
              },
            },
            opacity: {
              type: "number",
              description: "Please provide a fill opacity",
              options: {
                updateType: "onChange",
              },
            },
          },
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
