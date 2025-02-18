import shapeMap from "@/map/shape-map";

export default {
  type: "object",
  properties: {
    mode: {
      type: "string",
      description: "Please select a mode",
      options: {
        defaultValue: "light",
      },
      enum: [
        {
          value: "light",
          label: "Light",
          startIcon: shapeMap["lightMode"].icon,
        },
        { value: "dark", label: "Dark", startIcon: shapeMap["darkMode"].icon },
      ],
    },
    name: {
      label: "Project Name",
      type: "string",
      description: "Please enter a project name",
    },
  },
};
