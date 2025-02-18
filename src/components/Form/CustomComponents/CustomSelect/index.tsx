import {
  Box,
  Input,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
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
    startAdornment?: InputAdornmentType;
    endAdornment?: InputAdornmentType;
    placeholder?: string;
    margin?: string;
  };
}

const CustomTextField = ({
  label,
  value,
  updateValue,
  type,
  selectOptions,
  uiSchemaOptions,
  schemaOptions,
  updateType = UpdateType.CHANGE,
}: CustomTextFieldProps) => {
  const [inputValue, setInputValue] = useState(
    value || schemaOptions?.defaultValue || ""
  );
  const debounceValue = useDebounce(inputValue);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setInputValue(value);
    }
  }, [value, isFocused]);

  const handleUpdateValue = (newValue) => {
    updateValue(newValue);
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
        margin: uiSchemaOptions?.margin || "0 0 0.5rem 0",
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <InputLabel htmlFor="custom-text-field" sx={{ fontSize: "0.875rem" }}>
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        fullWidth
        size="small"
        value={inputValue}
        sx={{
          "& .MuiSelect-select": {
            display: "grid",
            gridTemplateColumns: "24px 1fr",
            gap: "1rem",
            alignItems: "center",
          },
        }}
        onChange={(evt) => {
          setInputValue(evt.target.value);
        }}
      >
        {selectOptions.map((opt) => (
          <MenuItem
            key={opt.value}
            sx={{ display: "flex", alignItems: "center" }}
            value={opt.value}
          >
            {opt.startIcon ? (
              <ListItemIcon>
                <opt.startIcon />
              </ListItemIcon>
            ) : null}

            {opt.label}
            {opt.endIcon ? (
              <ListItemIcon>
                <opt.endIcon />
              </ListItemIcon>
            ) : null}
          </MenuItem>
        ))}
      </Select>

      {/* <OutlinedInput
          id="custom-text-field"
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
        /> */}
    </Box>
  );
};

export default CustomTextField;
