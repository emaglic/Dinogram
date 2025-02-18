import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.styles";
import { DateTime } from "luxon";

const ManifestList = ({ manifest, handleLoadProject }) => {
  const theme = useTheme();
  const styles = Styles(theme);

  if (!manifest || !manifest.length) {
    return <Typography>No projects found</Typography>;
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.itemHeader}>
        <Typography>Project Name</Typography>
        <Typography>Created Date</Typography>
      </Box>
      {manifest.map((item) => (
        <Box
          sx={styles.item}
          onClick={() => {
            handleLoadProject(item.id);
          }}
          key={item.name}
        >
          <Typography>{item.name}</Typography>
          <Typography>
            {DateTime.fromISO(item.createdDate, { zone: "utc" })
              .toLocal()
              .toFormat("yyyy/MM/dd hh:mm:ss a")}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ManifestList;
