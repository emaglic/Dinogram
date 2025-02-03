import React from "react";
import { Box, Tabs } from "@mui/material";
import LayersPanel from "../Panels/Layers";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import AutoTabs from "@/components/AutoTabs";
import Sidebar from "../Sidebar";

const RightPanel = () => {
  const theme = useTheme();
  const styles = Styles(theme);

  return (
    <>
      <Sidebar />
    </>
  );
};

export default RightPanel;
