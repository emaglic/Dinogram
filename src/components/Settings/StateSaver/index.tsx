import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLSSaveManifest, useLSSaveProject } from "@/hooks/LocalStorage/save";
import { selectManifest } from "@/state/Chart/manifestSlice";
import { selectProject } from "@/state/Chart/projectSlice";
import { selectChart } from "@/state/Chart/chartSlice";

const StateSaver = () => {
  const manifest = useSelector(selectManifest);
  const project = useSelector(selectProject);
  const chart = useSelector(selectChart);

  useLSSaveManifest(manifest);
  useLSSaveProject(project, chart);

  return null;
};

export default StateSaver;
