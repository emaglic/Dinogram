import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.styles";
const NewProject = ({ handleCreateNewProject }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const [value, setValue] = useState("");
  return (
    <Box>
      <Typography textAlign="center" variant={"h6"}>
        Create New Project
      </Typography>
      <Box sx={styles.input}>
        <TextField
          fullWidth
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            handleCreateNewProject(value);
          }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default NewProject;
