import { useEffect } from "react";

export const useLSSaveProject = (project, chart) => {
  useEffect(() => {
    if (project?.name) {
      localStorage.setItem(project.name, JSON.stringify({ ...project, chart }));
    }
  }, [project, chart]);
};

export const useLSSaveManifest = (manifest) => {
  console.log("manifestToSave: ", manifest);
  useEffect(() => {
    if (manifest && manifest.length) {
      localStorage.setItem("manifest", JSON.stringify(manifest));
    }
  }, [manifest]);
};
