export default {
  type: "VerticalLayout",
  elements: [
    {
      type: "Header",
      label: "Text Properties",
      options: {
        variant: "body1",
        divider: {
          top: "main",
        },
      },
    },
    {
      type: "Control",
      scope: "#/properties/data/properties/text/properties/value",
      label: "Content",
      options: {
        multiline: true,
      },
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          label: "Size",
          scope: "#/properties/data/properties/text/properties/size",
        },
        {
          type: "Control",
          scope: "#/properties/data/properties/text/properties/align",
          label: "Align",
        },
      ],
    },
    {
      type: "VerticalLayout",
      elements: [
        {
          type: "Header",
          label: "Text ",
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
              scope: "#/properties/data/properties/text/properties/color",
            },
            {
              type: "Control",
              scope: "#/properties/data/properties/text/properties/opacity",
            },
          ],
        },
      ],
    },
    {
      type: "VerticalLayout",
      elements: [
        {
          type: "Header",
          label: "Fill",
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
              scope: "#/properties/data/properties/fill/properties/color",
            },
            {
              type: "Control",
              scope: "#/properties/data/properties/fill/properties/opacity",
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
