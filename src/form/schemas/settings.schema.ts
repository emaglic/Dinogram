export default {
  type: "object",
  properties: {
    mode: {
      type: "string",
      description: "Please select a mode",
      enum: ["light", "dark"],
    },
    name: {
      label: "Project Name",
      type: "string",
      description: "Please enter a project name",
    },
  },
};
