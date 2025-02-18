import { ChromePicker } from "react-color";
import React, { useState, useEffect } from "react";
import {
  Box,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Popover,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import useDebounce from "@/hooks/useDebounce"; // Import debounce hook

interface Props {
  value: string;
  updateValue: (value: string) => void;
}

const ColorPicker = ({ label, value, updateValue }: Props) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [color, setColor] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  // Debounce the color state before updating Redux
  const debouncedColor = useDebounce(color);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "color-popover" : undefined;

  const handleSetColor = (newColor: string) => {
    setColor(newColor);
  };

  // Sync with Redux state when input is NOT focused
  useEffect(() => {
    if (!isFocused) {
      setColor(value);
    }
  }, [value, isFocused]);

  // Use the debounced value before updating Redux to avoid missing characters
  useEffect(() => {
    if (isFocused) {
      updateValue(debouncedColor);
    }
  }, [debouncedColor]);

  return (
    <Box onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
      <InputLabel htmlFor="color-picker-field" sx={{ fontSize: "0.875rem" }}>
        {label}
      </InputLabel>
      <Box id="color-picker-field" sx={styles.container}>
        <OutlinedInput
          fullWidth
          size="small"
          value={color || ""}
          onBlur={(evt) => updateValue(evt.target.value)}
          onChange={(evt) => handleSetColor(evt.target.value)}
          placeholder=""
          startAdornment={
            <InputAdornment position="start">
              <Box sx={styles.swatch(color)} onClick={handleClick}></Box>
            </InputAdornment>
          }
        />
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ChromePicker
          className={styles.popover}
          color={color}
          disableAlpha={true}
          onBlur={(color) => updateValue(color.hex)}
          onChange={(color) => handleSetColor(color.hex)}
        />
      </Popover>
    </Box>
  );
};

export default ColorPicker;
