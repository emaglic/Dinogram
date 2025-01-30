import React from "react";
import { Box, Tabs } from "@mui/material";
import LayersPanel from "../Panels/Layers";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import AutoTabs from "@/components/AutoTabs";

const LeftPanel = () => {
  const theme = useTheme();
  const styles = Styles(theme);

  const tabs = [{ label: "Layers", component: <LayersPanel /> }];

  return (
    <Box sx={styles.container}>
      <AutoTabs tabs={tabs} />
    </Box>
  );
};

export default LeftPanel;
