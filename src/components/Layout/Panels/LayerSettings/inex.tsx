import useSelectedChartElements from "@/hooks/useGetSelected";
import { selectChart } from "@/state/Chart/chartSlice";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ElementProperties from "./ElementProperties";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";

const getContent = (selectedChartElements) => {
  switch (selectedChartElements.length) {
    case 0:
      return <Typography>Nothing Selected</Typography>;
    case 1:
      return (
        <ElementProperties selectedChartElements={selectedChartElements} />
      );
    default:
      return <Typography>Multiple Elements Selected</Typography>;
  }
};

const LayerSettings = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const chart = useSelector(selectChart);
  const { nodes, edges } = useSelectedChartElements(chart);
  const selectedChartElements = [...nodes, ...edges];

  return <Box sx={styles.container}>{getContent(selectedChartElements)}</Box>;
};

export default LayerSettings;
