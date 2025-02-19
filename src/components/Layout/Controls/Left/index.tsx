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
import MovieIcon from "@mui/icons-material/Movie";

const FloatingControlBar = () => {
  const theme = useTheme();
  const styles = Styles(theme);

  return (
    <Box sx={styles.container}>
      <ShapePicker />
      <BasicNodeGenerator
        type={nodeTypes.text.type}
        label={nodeTypes.text.label}
        Icon={nodeTypes.text.icon}
        defaultData={nodeTypes.text.defaultData}
      />
      <BasicNodeGenerator
        type={nodeTypes.image.type}
        label={nodeTypes.image.label}
        Icon={nodeTypes.image.icon}
        defaultData={nodeTypes.image.defaultData}
      />
      <BasicNodeGenerator
        type={nodeTypes.video.type}
        label={nodeTypes.video.label}
        Icon={nodeTypes.video.icon}
        defaultData={nodeTypes.video.defaultData}
      />
      <BasicNodeGenerator
        type={nodeTypes.richText.type}
        label={nodeTypes.richText.label}
        Icon={nodeTypes.richText.icon}
        defaultData={nodeTypes.richText.defaultData}
      />
      <BasicNodeGenerator
        type={nodeTypes.code.type}
        label={nodeTypes.code.label}
        Icon={nodeTypes.code.icon}
        defaultData={nodeTypes.code.defaultData}
      />
      <BasicNodeGenerator
        type={nodeTypes.drawing.type}
        label={nodeTypes.drawing.label}
        Icon={nodeTypes.drawing.icon}
        defaultData={nodeTypes.drawing.defaultData}
      />
      <BasicNodeGenerator
        type={nodeTypes.web.type}
        label={nodeTypes.web.label}
        Icon={nodeTypes.web.icon}
        defaultData={nodeTypes.web.defaultData}
      />
    </Box>
  );
};

export default FloatingControlBar;
