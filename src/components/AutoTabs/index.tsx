import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

const AutoTabs = ({ tabs }) => {
  const [tabSelected, setTabSelected] = useState(0);

  const handleChange = (event, newValue) => {
    setTabSelected(newValue);
  };

  return (
    <>
      <Tabs
        value={tabSelected}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {tabs.map((tab) => (
          <Tab key={tab.label} label={tab.label} />
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
