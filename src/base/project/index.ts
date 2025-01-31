const getNewProject = (name: string) => {
  return {
    name: name,
    projectDescription: "",
    createdDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };
};

export default getNewProject;
