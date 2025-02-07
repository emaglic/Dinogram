export default {
  type: "VerticalLayout",
  elements: [
    {
      type: "Group",
      label: "Props",
      elements: [
        {
          type: "HorizontalLayout",
          elements: [
            {
              label: "Label",
              type: "Control",
              scope: "#/properties/data/properties/label",
              options: {
                marginY: "bottom",
              },
            },
          ],
        },
        {
          type: "HorizontalLayout",

          elements: [
            {
              type: "Control",
              scope: "#/properties/position/properties/x",
              options: {
                startAdornment: {
                  type: "text",
                  value: "X",
                },
              },
            },
            {
              type: "Control",
              scope: "#/properties/position/properties/y",
              options: {
                startAdornment: {
                  type: "text",
                  value: "Y",
                },
              },
            },
          ],
        },
        {
          type: "HorizontalLayout",
          elements: [
            {
              type: "Control",
              scope: "#/properties/width",
              options: {
                startAdornment: {
                  type: "text",
                  value: "W",
                },
              },
            },
            {
              type: "Control",
              scope: "#/properties/height",
              options: {
                startAdornment: {
                  type: "text",
                  value: "H",
                },
              },
            },
          ],
        },
        {
          type: "HorizontalLayout",
          elements: [
            {
              type: "Control",
              scope: "#/properties/data/properties/visible",
            },
            {
              type: "Control",
              scope: "#/properties/data/properties/locked",
            },
          ],
        },
      ],
    },
    /* {
      type: "Group",
      label: "Shape Props",
      elements: [
        {
          type: "Control",
          scope: "#/properties/data/properties/shape",
        },
      ],
    }, */
  ],
};
