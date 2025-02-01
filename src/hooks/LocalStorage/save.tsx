import { useEffect } from "react";

export const useLSSaveProject = (project, chart) => {
  useEffect(() => {
    if (!project?.name) return;
    if (!chart?.nodes?.length && !chart?.edges?.length) return;
    localStorage.setItem(project.name, JSON.stringify({ ...project, chart }));
  }, [project, chart]);
};

export const useLSSaveManifest = (manifest) => {
  useEffect(() => {
    if (manifest && manifest.length) {
      localStorage.setItem("manifest", JSON.stringify(manifest));
    }
  }, [manifest]);
};
