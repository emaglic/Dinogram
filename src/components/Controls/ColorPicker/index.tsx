import { ChromePicker } from "react-color";
import React, { useState, useEffect } from "react";
import { Box, Button, InputLabel, OutlinedInput, Popover } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";

interface Props {
  value: string;
  updateValue: (value: string) => void;
}

const ColorPicker = ({ label, value, updateValue }: Props) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [color, setColor] = useState(value);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    updateValue(color);
  };

  const open = Boolean(anchorEl);
  const id = open ? "color-popover" : undefined;

  useEffect(() => {
    setColor(value);
  }, [value]);

  return (
    <>
      <InputLabel htmlFor="color-picker-field">{label}</InputLabel>
      <Box id="color-picker-field" sx={styles.container}>
        <Box
          ria-describedby={id}
          sx={styles.swatch(color)}
          onClick={handleClick}
        ></Box>
        <OutlinedInput
          fullWidth
          size="small"
          value={color || ""}
          onChange={(evt) => {
            setColor(evt.target.value);
          }}
          placeholder=""
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
          onChange={(color) => {
            setColor(color.hex);
          }}
        />
      </Popover>
    </>
  );
};

export default ColorPicker;
