export default {
  properties: {
    data: {
      properties: {
        drawing: {
          type: "object",
          properties: {
            backgroundColor: {
              type: "string",
              description: "Please provide a background color",
            },
            displayBackgroundColor: {
              type: "boolean",
              description: "Display the background color?",
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
