import { Box } from "@mui/material";
import React, { useState } from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BaseNode from "../BaseNode";

const RichTextNode = () => {
  // Render the Slate context.
  const [value, setValue] = useState("");
  return (
    <>
      <BaseNode minWidth={200} minHeight={200}>
        <Box
          sx={{
            margin: "1rem",
            backgroundColor: "#fff",
            boxSizing: "border-box",
            //width: "100%",
            height: "100%",
          }}
        >
          <ReactQuill theme="snow" value={value} onChange={setValue} />
          <Handle
            type="target"
            position={Position.Left}
            id="left-handle-target"
          />
        </Box>
      </BaseNode>
    </>
  );
};

export default RichTextNode;
