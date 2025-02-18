export default {
  type: "VerticalLayout",
  elements: [
    {
      type: "Header",
      label: "Properties",
      options: {
        variant: "body1",
        divider: {
          top: false,
        },
      },
    },
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
          scope: "#/properties/data/properties/visible",
        },
        {
          type: "Control",
          scope: "#/properties/data/properties/locked",
        },
      ],
    },
    {
      type: "Header",
      label: "Edge Properties",
      options: {
        variant: "body1",
        divider: {
          top: "main",
        },
      },
    },
    {
      type: "Control",
      label: "Path Type",
      scope: "#/properties/data/properties/pathType",
      options: {
        fieldType: "select",
      },
    },
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
};
