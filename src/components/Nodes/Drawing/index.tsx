import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import BaseNode from "../BaseNode";
import useDebounce from "@/hooks/useDebounce";
import { updateNodeData } from "@/state/Chart/chartSlice";
import { selectIsDragging } from "@/state/Settings/settingsSlice";
import { ReactSketchCanvas } from "react-sketch-canvas";
import Styles from "./index.style";
import { isEqual } from "lodash";
import FreehandCanvas from "./FreehandCanvas";
import hexToRgba from "@/utils/hexToRgba";

const RichTextNode = ({ selected, type, data, id }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const ref = useRef<ReactSketchCanvas | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(data?.drawing?.base64 || null);
  const debouncedValue = useDebounce(value);

  const handleFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  useEffect(() => {
    setValue(data.drawing.base64);
  }, []);

  useEffect(() => {
    const newData = {
      ...data,
      drawing: { ...data.drawing, base64: debouncedValue },
    };
    dispatch(updateNodeData({ id, data: newData }));
  }, [debouncedValue]);

  const onChange = (newBase64) => {
    setValue(newBase64);
  };

  return (
    <BaseNode
      id={id}
      type={type}
      data={data}
      label={data.label}
      selected={selected}
      minWidth={200}
      minHeight={200}
    >
      <Box
        sx={{
          backgroundColor: data.drawing.displayBackgroundColor
            ? data.drawing.backgroundColor
            : "transparent",
          boxSizing: "border-box",
          width: "100%",
          height: "100%",
          overflowY: "hidden",
          display: "flex",
          border: `${data.stroke.width}px solid ${hexToRgba(
            data.stroke.color,
            data.stroke.opacity / 100
          )}`,
        }}
      >
        <FreehandCanvas
          selected={selected}
          imageBase64={value}
          onChange={onChange}
        />
      </Box>
    </BaseNode>
  );
};

export default RichTextNode;
