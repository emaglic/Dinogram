import React, { useState } from "react";
import { Box, Tab, Tabs, Tooltip } from "@mui/material";

const AutoTabs = ({ tabs, iconOnly }) => {
  const [tabSelected, setTabSelected] = useState(0);

  const handleChange = (event, newValue) => {
    setTabSelected(newValue);
  };

  console.log("tabs: ", tabs);

  console.log("iconOnly: ", iconOnly);

  return (
    <>
      <Tabs
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
