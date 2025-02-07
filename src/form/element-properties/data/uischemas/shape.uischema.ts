export default {
  type: "VerticalLayout",
  elements: [
    {
      type: "Group",
      label: "Shape Props",
      elements: [
        {
          type: "Control",
          scope: "#/properties/data/properties/showLabel",
        },
        {
          type: "Control",
          scope: "#/properties/data/properties/iconKey",
        },
        {
          label: "Fill Color",
          type: "Control",
          scope: "#/properties/data/properties/fill/properties/color",
        },
        {
          label: "Stroke Color",
          type: "Control",
          scope: "#/properties/data/properties/stroke/properties/color",
        },
        {
          label: "Stroke Width",
          type: "Control",
          scope: "#/properties/data/properties/stroke/properties/width",
        },
      ],
    },
  ],
};
