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
              type: "Control",
              scope: "#/properties/data/properties/label",
            },
          ],
        },
        {
          type: "HorizontalLayout",

          elements: [
            {
              type: "Control",
              scope: "#/properties/position/properties/x",
            },
            {
              type: "Control",
              scope: "#/properties/position/properties/y",
            },
          ],
        },
        {
          type: "HorizontalLayout",
          elements: [
            {
              type: "Control",
              scope: "#/properties/width",
            },
            {
              type: "Control",
              scope: "#/properties/height",
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
