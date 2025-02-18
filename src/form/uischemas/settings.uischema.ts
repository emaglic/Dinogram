export default {
  type: "VerticalLayout",
  elements: [
    {
      type: "Header",
      label: "Project Properties",
      options: {
        variant: "body1",
        divider: {
          top: false,
        },
      },
    },
    {
      label: "Project Name",
      type: "Control",
      scope: "#/properties/name",
      /* options: {
              marginY: "bottom",
            }, */
    },
    {
      label: "Mode",
      type: "Control",
      scope: "#/properties/mode",
    },
  ],
};
