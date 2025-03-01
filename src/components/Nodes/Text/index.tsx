import React from "react";
import { Box, Typography } from "@mui/material";
import BaseNode from "@/components/Nodes/BaseNode";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import hexToRgba from "@/utils/hexToRgba";

const minWidth = 10;
const minHeight = 10;

const TextNode = ({ id, selected, type, data }) => {
  const theme = useTheme();
  const styles = Styles(theme);

  const bgColor = data?.fill?.color;
  const bgOpacity =
    typeof data?.fill?.opacity === "number" ? data?.fill?.opacity / 100 : 1;

  const brdrColor = data?.stroke?.color;
  const brdrOpacity =
    typeof data?.stroke?.opacity === "number" ? data?.stroke?.opacity / 100 : 1;

  const backgroundColor = bgColor
    ? hexToRgba(bgColor, bgOpacity)
    : "transparent";

  const borderColor = brdrColor
    ? hexToRgba(brdrColor, brdrOpacity)
    : "transparent";

  return (
    <>
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
          sx={{
            ...styles.container,
            backgroundColor,
            borderColor,
            borderStyle: "solid",
            borderWidth: data?.stroke?.width ? `${data?.stroke?.width}px` : 0,
            textAlign: data?.text?.align || "left",
          }}
        >
          <Typography
            sx={{ color: data?.text?.color || "#000000", width: "100%" }}
            variant={data.text.size}
            component={"div"}
          >
            {data.text.value}
          </Typography>
        </Box>
      </BaseNode>
    </>
  );
};

export default TextNode;
