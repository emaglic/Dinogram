import React, { useState } from "react";
import { Box, Tab, Tabs, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";

const AutoTabs = ({ tabs, iconOnly, defaultTab }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const [tabSelected, setTabSelected] = useState(defaultTab || 0);

  const handleChange = (event, newValue) => {
    setTabSelected(newValue);
  };

  return (
    <>
      <Tabs
        sx={styles.tabContainer}
        value={tabSelected}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {tabs.map((tab) => (
          <Tooltip title={tab.label} key={tab.label} placement="top" arrow>
            <Tab
              icon={tab.icon ? <tab.icon /> : undefined}
              label={iconOnly && tab.icon ? "" : tab.label}
            />
          </Tooltip>
        ))}
      </Tabs>
      <>
        {tabs.map((tab, index) => (
          <Box key={tab.label} hidden={tabSelected !== index}>
            {tab.component}
          </Box>
        ))}
      </>
    </>
  );
};

export default AutoTabs;
