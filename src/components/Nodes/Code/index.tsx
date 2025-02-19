import React, { useEffect, useRef, useState } from "react";
import BaseNode from "@/components/Nodes/BaseNode";
import { Box, Typography } from "@mui/material";
import hexToRgba from "@/utils/hexToRgba";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import shapeMap from "@/map/shape-map";
import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "@/hooks/useDebounce";
import { updateNodeData } from "@/state/Chart/chartSlice";
import { selectIsDragging } from "@/state/Chart/settingsSlice";

const minWidth = 10;
const minHeight = 10;

const CodeNode = ({ id, selected, type, data }) => {
  const theme = useTheme();
  const styles = Styles(theme);

  const dispatch = useDispatch();

  const isDragging = useSelector(selectIsDragging);

  const ref = useRef<Editor | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(data?.code.value || "");
  const debouncedValue = useDebounce(value);

  const handleFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  useEffect(() => {
    if (!isFocused) {
      setValue(data.code.value);
    }
  }, [data.code.value]);

  useEffect(() => {
    const newData = { ...data, code: { ...data.code, value: debouncedValue } };
    dispatch(updateNodeData({ id, data: newData }));
  }, [debouncedValue]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    ref.current = editor;
  };

  const handleEditorChange = (newValue: string) => {
    setValue(newValue);
  };

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
        ref={ref}
        className={isDragging ? undefined : "nodrag"}
        sx={{
          ...styles.container,
          border: `${data.stroke.width}px solid ${hexToRgba(
            data.stroke.color,
            data.stroke.opacity / 100
          )}`,
        }}
        onClick={handleFocus}
      >
        <Editor
          onMount={handleEditorDidMount}
          height="100%"
          width="100%"
          key={data.code.language || "plaintext"}
          defaultLanguage={data.code.language || "plaintext"}
          defaultValue={value}
          theme={theme.palette.mode === "dark" ? "vs-dark" : "vs-light"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleEditorChange}
        />
      </Box>
    </BaseNode>
  );
};

export default CodeNode;
