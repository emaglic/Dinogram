import React, { memo, useEffect } from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import { Box, Icon, Typography } from "@mui/material";
import BaseNode from "../BaseNode";
import { useSelector } from "react-redux";
import { selectIsDragging } from "@/state/Settings/settingsSlice";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import shapeMap from "@/map/shape-map";

const WebNode = ({ id, selected, type, data }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const isDragging = useSelector(selectIsDragging);

  const Icon = shapeMap["web"].icon;

  return (
    <>
      <BaseNode
        id={id}
        data={data}
        type={type}
        label={data.label}
        selected={selected}
        minWidth={200}
        minHeight={200}
      >
        <Box
          sx={{
            ...styles.noSource,
            backgroundColor: !data.url.length
              ? theme.palette.getContrastText(theme.palette.background.default)
              : theme.palette.background.default,
            color: theme.palette.getContrastText(theme.palette.text.primary),
          }}
        >
          {data.url.length ? (
            <iframe
              className={isDragging ? undefined : "nodrag"}
              style={{ width: "100%", height: "100%", border: "none" }}
              src={data.url}
            />
          ) : null}
          {!data.url?.length ? (
            <Box sx={styles.noSourceInner}>
              <Icon sx={{ width: "35%", height: "35%" }} />
              <Typography variant="h6">Enter a URL</Typography>
            </Box>
          ) : null}
        </Box>
      </BaseNode>
    </>
  );
};

export default WebNode;
