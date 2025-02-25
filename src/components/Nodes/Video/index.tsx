import React from "react";
import ReactPlayer from "react-player";
import BaseNode from "@/components/Nodes/BaseNode";
import { Box, Typography } from "@mui/material";
import hexToRgba from "@/utils/hexToRgba";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import shapeMap from "@/map/shape-map";
import { useSelector } from "react-redux";
import { selectIsDragging } from "@/state/Settings/settingsSlice";

const minWidth = 10;
const minHeight = 10;

const ImageNode = ({ id, selected, type, data }) => {
  const theme = useTheme();
  const styles = Styles(theme);

  const isDragging = useSelector(selectIsDragging);

  const Icon = shapeMap["movie"].icon;

  return (
    <BaseNode
      id={id}
      type={type}
      data={data}
      label={data.label}
      selected={selected}
      minWidth={minWidth}
      minHeight={minHeight}
    >
      <Box
        className={isDragging ? undefined : "nodrag"}
        sx={{
          ...styles.container,
          backgroundColor: !data.video.src.length
            ? theme.palette.getContrastText(theme.palette.background.default)
            : theme.palette.background.default,
          border: `${data.stroke.width}px solid ${hexToRgba(
            data.stroke.color,
            data.stroke.opacity / 100
          )}`,
        }}
      >
        <Box sx={styles.videoContainer}>
          <ReactPlayer url={data.video.src} controls style={styles.video} />
          {!data.video.src ? (
            <Box
              sx={{
                ...styles.noSource,
                color: theme.palette.getContrastText(
                  theme.palette.text.primary
                ),
              }}
            >
              <Icon sx={{ width: "35%", height: "35%" }} />
              <Typography variant="h6">Enter a Video Source</Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
    </BaseNode>
  );
};

export default ImageNode;
