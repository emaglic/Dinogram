export default {
  type: "VerticalLayout",
  elements: [
    {
      type: "Header",
      label: "Code Properties",
      options: {
        variant: "body1",
        divider: {
          top: "main",
        },
      },
    },
    {
      label: "Language",
      type: "Control",
      scope: "#/properties/data/properties/code/properties/language",
    },
    {
      type: "VerticalLayout",
      elements: [
        {
          type: "Header",
          label: "Stroke",
          options: {
            variant: "caption",
            divider: {
              top: "sub",
            },
            margin: "1rem 0 0.5rem 0",
          },
        },
        {
          type: "HorizontalLayout",

          elements: [
            {
              type: "Control",
              scope: "#/properties/data/properties/stroke/properties/color",
            },
            {
              type: "Control",
              scope: "#/properties/data/properties/stroke/properties/width",
              options: {
                endAdornment: {
                  type: "text",
                  value: "px",
                },
              },
            },
            {
              type: "Control",
              scope: "#/properties/data/properties/stroke/properties/opacity",
              options: {
                endAdornment: {
                  type: "text",
                  value: "%",
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
