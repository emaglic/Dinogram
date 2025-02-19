export default {
  properties: {
    data: {
      properties: {
        image: {
          type: "object",
          properties: {
            src: {
              type: "string",
              description: "Please provide an image source",
            },
            size: {
              type: "string",
              enum: [
                { value: "contain", label: "Fit" },
                { value: "cover", label: "Crop & Fill" },
                { value: "scale-down", label: "100%" },
                { value: "100% 100%", label: "Stretch" },
              ],
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
