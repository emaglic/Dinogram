import {
  Box,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import shapeMap from "@/map/shape-map";

type InputAdornmentType =
  | {
      type: "text" | "icon";
      value: string;
    }
  | undefined;

export interface CustomTextFieldProps {
  value: string;
  updateValue: (value: string) => void;
  label?: string;
  placeholder?: string;
  type: "text" | "number" | "integer";
  options?: {
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
}: CustomTextFieldProps) => {
  const startAdornment = getInputAdornment(options?.startAdornment, "start");
  const endAdornment = getInputAdornment(options?.endAdornment, "end");

  let componentType =
    type === "number" || type === "integer" ? "number" : "text";

  return (
    <Box
      sx={{
        width: "100%",
        margin: options?.margin || "0 0 0.5rem 0",
      }}
    >
      <InputLabel htmlFor="custom-text-field">{label}</InputLabel>
      <OutlinedInput
        id="custom-text-field"
        fullWidth
        size="small"
        value={value}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        type={componentType}
        onChange={(evt) => {
          updateValue(evt.target.value);
        }}
        placeholder={options?.placeholder || ""}
      />
    </Box>
  );
};

export default CustomTextField;
