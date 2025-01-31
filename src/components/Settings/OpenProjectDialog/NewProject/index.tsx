import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.styles";
const NewProject = ({ handleCreateNewProject }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const [value, setValue] = useState("");
  return (
    <Box sx={styles.container}>
      <TextField value={value} onChange={(evt) => setValue(evt.target.value)} />
      <Button
        variant="contained"
        onClick={() => {
          handleCreateNewProject(value);
        }}
      >
        New
      </Button>
    </Box>
  );
};

export default NewProject;
