export default {
  properties: {
    data: {
      properties: {
        text: {
          type: "object",
          properties: {
            value: {
              type: "string",
            },
            align: {
              type: "string",
              enum: [
                { value: "left", label: "Left" },
                { value: "center", label: "Center" },
                { value: "right", label: "Right" },
                { value: "justify", label: "Justify" },
              ],
            },
            size: {
              type: "string",
              enum: [
                { value: "h1", label: "h1" },
                { value: "h2", label: "h2" },
                { value: "h3", label: "h3" },
                { value: "h4", label: "h4" },
                { value: "h5", label: "h5" },
                { value: "h6", label: "h6" },
                { value: "subtitle1", label: "subtitle1" },
                { value: "subtitle2", label: "subtitle2" },
                { value: "body1", label: "body1" },
                { value: "body2", label: "body2" },
                { value: "button", label: "button" },
                { value: "caption", label: "caption" },
                { value: "overline", label: "overline" },
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
