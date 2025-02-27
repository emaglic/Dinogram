import {
  Box,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import shapeMap from "@/map/shape-map";
import useDebounce from "@/hooks/useDebounce";

export enum UpdateType {
  BLUR = "onBlur",
  CHANGE = "onChange",
}

type InputAdornmentType =
  | {
      type: "text" | "icon";
      value: string;
    }
  | undefined;

export interface CustomTextFieldProps {
  value: string;
  updateValue: <T>(value: T) => void;
  label?: string;
  placeholder?: string;
  type: "text" | "number" | "integer";
  updateType: UpdateType;
  options?: {
    multiline?: boolean;
    startAdornment?: InputAdornmentType;
    endAdornment?: InputAdornmentType;
    placeholder?: string;
    margin?: string;
  };
}

const getInputAdornment = (
  adornmentProps: InputAdornmentType,
  position: "start" | "end"
) => {
  if (!adornmentProps) return undefined;
  const { type, value } = adornmentProps;
  let Content = undefined;
  if (type === "icon") {
    Content = shapeMap[value];
  } else {
    Content = <Typography>{value}</Typography>;
  }
  return Content ? (
    <InputAdornment position={position}>{Content}</InputAdornment>
  ) : undefined;
};

const CustomTextField = ({
  label,
  value,
  updateValue,
  type,
  options,
  updateType = UpdateType.CHANGE,
}: CustomTextFieldProps) => {
  const [inputValue, setInputValue] = useState(value);
  const debounceValue = useDebounce(inputValue);
  const startAdornment = getInputAdornment(options?.startAdornment, "start");
  const endAdornment = getInputAdornment(options?.endAdornment, "end");
  const [isFocused, setIsFocused] = useState(false);

  let componentType =
    type === "number" || type === "integer" ? "number" : "text";

  useEffect(() => {
    if (!isFocused) {
      setInputValue(value);
    }
  }, [value, isFocused]);

  const handleUpdateValue = (newValue) => {
    updateValue(componentType === "number" ? parseFloat(newValue) : newValue);
  };

  useEffect(() => {
    if (isFocused) {
      handleUpdateValue(debounceValue);
    }
  }, [debounceValue]);

  return (
    <Box
      sx={{
        width: "100%",
        margin: options?.margin || "0 0 0.5rem 0",
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <InputLabel htmlFor="custom-text-field" sx={{ fontSize: "0.875rem" }}>
        {label}
      </InputLabel>
      <OutlinedInput
        id="custom-text-field"
        multiline={options?.multiline || false}
        maxRows={8}
        minRows={2}
        fullWidth
        size="small"
        value={inputValue}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        type={componentType}
        onBlur={(evt) => {
          handleUpdateValue(evt.target.value);
        }}
        onChange={(evt) => {
          setInputValue(evt.target.value);
        }}
        placeholder={options?.placeholder || ""}
      />
    </Box>
  );
};

export default CustomTextField;
