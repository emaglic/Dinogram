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
      type: "VerticalLayout",
      elements: [
        {
          type: "Header",
          label: "Text",
          options: {
            variant: "caption",

            margin: "0rem 0 1rem 0",
          },
        },
        {
          type: "Control",
          scope: "#/properties/data/properties/text/properties/size",
          options: {
            fieldType: "select",
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
