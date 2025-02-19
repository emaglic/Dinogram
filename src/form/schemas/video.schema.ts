export default {
  properties: {
    data: {
      properties: {
        video: {
          type: "object",
          properties: {
            src: {
              type: "string",
              description: "Please provide an image source",
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
