export default {
  type: "object",
  properties: {
    width: {
      type: "number",
      description: "Please enter the width of the element",
    },
    height: {
      type: "number",
      description: "Please enter the height of the element",
    },
    position: {
      type: "object",
      properties: {
        x: {
          type: "number",
          description: "Please enter the x position of the element",
        },
        y: {
          type: "number",
          description: "Please enter the y position of the element",
        },
      },
    },

    data: {
      type: "object",
      properties: {
        label: {
          type: "string",
          minLength: 1,
          description: "Please enter a label for the element",
        },
        visible: {
          type: "boolean",
          description: "Please select the visibility of the element",
        },
        locked: {
          type: "boolean",
          description: "Please select the lock status of the element",
        },
        rotation: {
          type: "number",
          description: "Please enter the rotation of the element",
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
