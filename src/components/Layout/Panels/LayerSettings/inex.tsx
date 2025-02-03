import useSelectedChartElements from "@/hooks/useGetSelected";
import { selectChart } from "@/state/Chart/chartSlice";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ElementProperties from "./ElementProperties";

const LayerSettings = () => {
  const chart = useSelector(selectChart);
  const { nodes, edges } = useSelectedChartElements(chart);
  const selectedChartElements = [...nodes, ...edges];

  if (selectedChartElements.length === 0) {
    return (
      <Box>
        <Typography>Nothing Selected</Typography>
      </Box>
    );
  }
  if (selectedChartElements.length > 1) {
    return <Typography>Multiple Elements Selected</Typography>;
  }

  return (
    <Box>
      <ElementProperties selectedChartElements={selectedChartElements} />
    </Box>
  );
};

export default LayerSettings;
