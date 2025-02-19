import React from "react";
import BaseNode from "@/components/Nodes/BaseNode";
import { Box, Typography } from "@mui/material";
import hexToRgba from "@/utils/hexToRgba";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import shapeMap from "@/map/shape-map";

const minWidth = 10;
const minHeight = 10;

const ImageNode = ({ selected, type, data }) => {
  const theme = useTheme();
  const styles = Styles(theme);

  const Icon = shapeMap["image"].icon;

  return (
    <BaseNode
      type={type}
      data={data}
      label={data.label}
      selected={selected}
      minWidth={minWidth}
      minHeight={minHeight}
    >
      <Box
        sx={{
          backgroundColor: !data.image.src.length
            ? theme.palette.getContrastText(theme.palette.background.default)
            : theme.palette.background.default,
          backgroundImage: `url(${data.image.src})`,
          backgroundSize: data.image.size,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          border: `${data.stroke.width}px solid ${hexToRgba(
            data.stroke.color,
            data.stroke.opacity / 100
          )}`,
        }}
      >
        {!data.image.src ? (
          <Box
            sx={{
              ...styles.noSource,
              color: theme.palette.getContrastText(theme.palette.text.primary),
            }}
          >
            <Icon sx={{ width: "35%", height: "35%" }} />
            <Typography variant="h6">Enter an Image Source</Typography>
          </Box>
        ) : null}
      </Box>
    </BaseNode>
  );
};

export default ImageNode;
