import React, { useRef, useState } from "react";
import { Box, Button, Tabs } from "@mui/material";
import LayersPanel from "../Panels/Layers";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import AutoTabs from "@/components/AutoTabs";
import LayerSettings from "../Panels/LayerSettings/index";
import LayersIcon from "@mui/icons-material/Layers";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Settings from "@/components/Layout/Panels/Settings";
import SettingsIcon from "@mui/icons-material/Settings";

interface Props {
  defaultTab?: number;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  side: "left" | "right";
}

const ExpandButton = ({ side, expanded }) => {
  if (side === "left") {
    return expanded ? (
      <KeyboardDoubleArrowLeftIcon />
    ) : (
      <KeyboardDoubleArrowRightIcon />
    );
  }
  if (side === "right") {
    return expanded ? (
      <KeyboardDoubleArrowRightIcon />
    ) : (
      <KeyboardDoubleArrowLeftIcon />
    );
  }
};

const Sidebar = ({ defaultTab, expanded, setExpanded, side }: Props) => {
  const theme = useTheme();
  const styles = Styles(theme);

  const containerRef = useRef(null);
  const [showContent, setShowContent] = useState(expanded);

  const tabs = [
    {
      label: "Layers",
      component: <LayersPanel />,
      icon: LayersIcon,
    },
    {
      label: "Layer Props",
      component: <LayerSettings />,
      icon: BorderColorIcon,
    },
    {
      label: "Settings",
      component: <Settings />,
      icon: SettingsIcon,
    },
  ];

  return (
    <Box
      ref={containerRef}
      sx={styles.container(side, expanded)}
      onTransitionEnd={() => {
        if (expanded) {
          setShowContent(true);
        } else {
          setShowContent(false);
        }
        /* if (containerRef.current) {
          console.log(containerRef.current?.offsetWidth);
        } */
      }}
    >
      <Box
        sx={styles.expandButton(side)}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <ExpandButton side={side} expanded={expanded} />
      </Box>
      {expanded && showContent && (
        <AutoTabs iconOnly={true} tabs={tabs} defaultTab={defaultTab} />
      )}
    </Box>
  );
};

export default Sidebar;
