export default {
  type: "VerticalLayout",
  elements: [
    {
      type: "Header",
      label: "Web Properties",
      options: {
        variant: "body1",
        divider: {
          top: "main",
        },
      },
    },
    {
      type: "Control",
      scope: "#/properties/data/properties/url",
      label: "URL",
    },
  ],
};
