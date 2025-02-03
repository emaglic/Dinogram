import React from "react";
import { Box, Tabs } from "@mui/material";
import LayersPanel from "../Panels/Layers";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import AutoTabs from "@/components/AutoTabs";
import LayerSettings from "../Panels/LayerSettings/inex";
import LayersIcon from "@mui/icons-material/Layers";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const Sidebar = () => {
  const theme = useTheme();
  const styles = Styles(theme);

  const tabs = [
    {
      label: "Layers",
      component: <LayersPanel />,
      icon: LayersIcon,
    },
    {
      label: "Layer Settings",
      component: <LayerSettings />,
      icon: BorderColorIcon,
    },
  ];

  return (
    <Box sx={styles.container}>
      <AutoTabs iconOnly={true} tabs={tabs} />
    </Box>
  );
};

export default Sidebar;
