export default {
  type: "object",
  properties: {
    width: {
      type: "number",
      description: "Please enter the width of the shape",
    },
    height: {
      type: "number",
      description: "Please enter the height of the shape",
    },
    position: {
      type: "object",
      properties: {
        x: {
          type: "number",
          description: "Please enter the x position of the shape",
        },
        y: {
          type: "number",
          description: "Please enter the y position of the shape",
        },
      },
    },

    data: {
      type: "object",
      properties: {
        label: {
          type: "string",
          minLength: 1,
          description: "Please enter a label for the shape",
        },
        visible: {
          type: "boolean",
          description: "Please select the visibility of the shape",
        },
        locked: {
          type: "boolean",
          description: "Please select the lock status of the shape",
        },
        /* shape: {
            type: "string",
            description: "Please select the shape of the element",
            enum: ["circle", "square", "triangle"],
          }, */
      },
    },
  },
};
