import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./dark-mode.css";
import BaseNode from "../BaseNode";
import useDebounce from "@/hooks/useDebounce";
import { updateNodeData } from "@/state/Chart/chartSlice";
import { selectIsDragging } from "@/state/Chart/settingsSlice";

const RichTextNode = ({ selected, type, data, id }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isDragging = useSelector(selectIsDragging);
  const ref = useRef<ReactQuill | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(data?.content || "");
  const debouncedValue = useDebounce(value);

  const handleFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  useEffect(() => {
    if (!isFocused) {
      setValue(data.content);
    }
  }, [data.content]);

  useEffect(() => {
    dispatch(updateNodeData({ id, data: { content: debouncedValue } }));
  }, [debouncedValue]);

  return (
    <>
      <BaseNode
        type={type}
        data={data}
        label={data.label}
        selected={selected}
        minWidth={200}
        minHeight={200}
      >
        <Box
          className={isDragging ? undefined : "nodrag"}
          sx={{
            //margin: "1rem",
            backgroundColor: "#fff",
            boxSizing: "border-box",
            width: "100%",
            height: "100%",
            overflowY: "auto",
          }}
          onClick={handleFocus}
        >
          <ReactQuill
            // className={theme.palette.mode === "dark" ? "dark-mode" : ""}
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr",
              height: "100%",
              color: "#000",
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            ref={ref}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </Box>
      </BaseNode>
    </>
  );
};

export default RichTextNode;
