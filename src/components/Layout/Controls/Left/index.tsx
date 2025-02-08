import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import nodeTypes from "@/base/nodes";
import { useSelector, useDispatch } from "react-redux";
import { createNode } from "@/state/Chart/chartSlice";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import { RootState } from "@/state/store";
import BasicNodeGenerator from "./BasicGenerator";
import ShapePicker from "@/components/Nodes/Shape/ShapePicker";

const FloatingControlBar = () => {
  const theme = useTheme();
  const styles = Styles(theme);

  return (
    <Box sx={styles.container}>
      <BasicNodeGenerator
        type={nodeTypes.richText.type}
        label={nodeTypes.richText.label}
        Icon={nodeTypes.richText.icon}
        defaultData={nodeTypes.richText.defaultData}
      />
      <BasicNodeGenerator
        type={nodeTypes.web.type}
        label={nodeTypes.web.label}
        Icon={nodeTypes.web.icon}
        defaultData={nodeTypes.web.defaultData}
      />
      <BasicNodeGenerator
        type={nodeTypes.text.type}
        label={nodeTypes.text.label}
        Icon={nodeTypes.text.icon}
        defaultData={nodeTypes.text.defaultData}
      />
      <ShapePicker />
    </Box>
  );
};

export default FloatingControlBar;
