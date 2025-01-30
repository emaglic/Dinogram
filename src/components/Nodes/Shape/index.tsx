import React from "react";
import { Box } from "@mui/material";
import ShapeMap from "@/map/shape-map";
import BaseNode from "@/components/Nodes/BaseNode";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.styles";
import ShapeBackground from "./Shape";

const ShapeNode = ({ selected, data }) => {
  const theme = useTheme();
  const styles = Styles(theme);

  return (
    <>
      <BaseNode
        data={data}
        label={data.label}
        selected={selected}
        minWidth={0}
        minHeight={0}
      >
        <Box sx={styles.container}>
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
