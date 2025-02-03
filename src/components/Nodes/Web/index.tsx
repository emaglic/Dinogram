import React, { memo, useEffect } from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import { Box } from "@mui/material";
import BaseNode from "../BaseNode";

const defaultData = {
  label: "web",
  src: "https://www.nintendo.com",
};

const WebNode = ({ selected, type, data }) => {
  return (
    <>
      <BaseNode
        data={data}
        type={type}
        label={data.label}
        selected={selected}
        minWidth={200}
        minHeight={200}
      >
        <iframe
          className={"nodrag"}
          style={{ width: "100%", height: "100%", border: "none" }}
          src={data.src}
        />
      </BaseNode>
    </>
  );
};

export default WebNode;
