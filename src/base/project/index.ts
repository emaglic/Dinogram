import { v4 as uuidv4 } from "uuid";

const getNewProject = (name: string) => {
  return {
    id: uuidv4(),
    name: name,
    mode: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
    projectDescription: "",
    createdDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };
};

export default getNewProject;
