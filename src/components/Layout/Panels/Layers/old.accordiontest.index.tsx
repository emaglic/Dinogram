import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Styles from "./index.style";
import NodeLayersPanel from "./Nodes";
import EdgeLayersPanel from "./Edges";

const LayersPanel = () => {
  const theme = useTheme();
  const styles = Styles(theme);

  const [nodesPanelVisible, setNodesPanelVisible] = useState(true);
  const [edgesPanelVisible, setEdgesPanelVisible] = useState(true);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <Accordion
        expanded={nodesPanelVisible}
        onChange={() => setNodesPanelVisible(!nodesPanelVisible)}
        disableGutters
        sx={{
          ...styles.accordion,
          flex:
            nodesPanelVisible && edgesPanelVisible
              ? "1 1 50%"
              : nodesPanelVisible
              ? "1 1 100%"
              : "0 0 auto",

          //transition: "flex 0.3s ease-in-out",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            backgroundColor: "transparent",

            "&.Mui-expanded": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Typography variant="h6">Nodes</Typography>
        </AccordionSummary>
        <Box
          data-id={"accordion-details-container"}
          sx={{
            flexGrow: 1, // Allows the collapsible container to take up available space
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", // Prevents double scrollbars
            "& .MuiCollapse-root": {
              flexGrow: 1, // Expands to fill available space
              display: "flex",
              flexDirection: "column",
            },
            "& .MuiAccordionDetails-root": {
              flexGrow: 1, // Allows content to take available space
              overflow: "auto", // Enables scrolling inside AccordionDetails
            },
          }}
        >
          <AccordionDetails sx={styles.accordionDetails}>
            <NodeLayersPanel />
          </AccordionDetails>
        </Box>
      </Accordion>

      <Accordion
        expanded={edgesPanelVisible}
        onChange={() => setEdgesPanelVisible(!edgesPanelVisible)}
        disableGutters
        sx={{
          ...styles.accordion,
          flex:
            edgesPanelVisible && nodesPanelVisible
              ? "1 1 50%"
              : edgesPanelVisible
              ? "1 1 100%"
              : "0 0 auto",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography variant="h6">Edges</Typography>
        </AccordionSummary>
        <AccordionDetails sx={styles.accordionDetails}>
          <EdgeLayersPanel />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default LayersPanel;
