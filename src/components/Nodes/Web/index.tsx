import React, { memo, useEffect } from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import { Box } from "@mui/material";
import BaseNode from "../BaseNode";

const defaultData = {
  label: "web",
  src: "https://www.nintendo.com",
};

const WebNode = ({ selected, data }) => {
  return (
    <>
      <BaseNode data={data} selected={selected} minWidth={200} minHeight={200}>
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "auto 1fr",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              backgroundColor: "gray",
              padding: "0.5rem",
              boxSizing: "border-box",
            }}
          >
            {data.label}
          </Box>
          <iframe
            className={"nodrag"}
            style={{ width: "100%", height: "100%" }}
            src={data.src}
          />
        </Box>
      </BaseNode>
    </>
  );
};

export default WebNode;
