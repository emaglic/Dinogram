import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./index.style";
import Main from "@/components/Layout/Main";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import apiRequest from "@/utils/api-request";
import { updateProject } from "@/state/Project/projectSlice";
import { replaceChart } from "@/state/Chart/chartSlice";

const DemoView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLoadProject = async (projectId: string) => {
    const project = await apiRequest(projectId, "GET", null, ".json");
    if (project.success && project.data) {
      const { chart, ...projectProps } = project.data;
      dispatch(updateProject(projectProps));
      dispatch(replaceChart(chart));
    } else {
      console.error("Failed to load project: ", project);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    const project = searchParams.get("project");
    if (project) {
      handleLoadProject(project);
    } else {
      navigate("/", { replace: true });
    }
  }, [searchParams]);

  return (
    <>
      <Main />
    </>
  );
};

export default DemoView;
