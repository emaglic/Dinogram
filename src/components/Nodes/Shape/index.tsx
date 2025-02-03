import React from "react";
import { Box } from "@mui/material";
import ShapeMap from "@/map/shape-map";
import BaseNode from "@/components/Nodes/BaseNode";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.styles";
import ShapeBackground from "./Shape";

const minWidth = 25;
const minHeight = 25;

const ShapeNode = ({ selected, type, data }) => {
  const theme = useTheme();
  const styles = Styles(theme);

  return (
    <>
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
            ...styles.container,
            minWidth: `${minWidth}px`,
            minHeight: `${minHeight}px`,
          }}
        >
          <ShapeBackground
            shape={data.shape}
            width={"100%"}
            height={"100%"}
            fill={"#000"}
            stroke={"transparent"}
          />
          <Box sx={styles.text}>{data.label}</Box>
        </Box>
      </BaseNode>
    </>
  );
};

export default ShapeNode;
