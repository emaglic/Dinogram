export default {
  properties: {
    data: {
      properties: {
        text: {
          type: "object",
          properties: {
            size: {
              type: "string",
              enum: [
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "subtitle1",
                "subtitle2",
                "body1",
                "body2",
                "button",
                "caption",
                "overline",
              ],
            },
            color: {
              type: "string",
              description: "Please provide a text color",
            },
            opacity: {
              type: "number",
              description: "Please provide a text opacity",
            },
          },
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
