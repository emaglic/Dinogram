import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BaseNode from "../BaseNode";

const RichTextNode = ({ selected, data }) => {
  const ref = useRef<ReactQuill | null>(null);
  const [value, setValue] = useState("");

  const handleFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <>
      <BaseNode data={data} selected={selected} minWidth={200} minHeight={200}>
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "auto 1fr",
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

          <Box
            className={"nodrag"}
            sx={{
              //margin: "1rem",
              backgroundColor: "#fff",
              boxSizing: "border-box",
              width: "100%",
              height: "100%",
            }}
            onClick={handleFocus}
          >
            <ReactQuill
              style={{
                display: "grid",
                gridTemplateRows: "auto 1fr",
                height: "100%",
              }}
              ref={ref}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </Box>
        </Box>
      </BaseNode>
    </>
  );
};

export default RichTextNode;
