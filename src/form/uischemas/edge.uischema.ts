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
      type: "Control",
      scope: "#/properties/type",
      options: {
        fieldType: "select",
      },
    },
  ],
};
