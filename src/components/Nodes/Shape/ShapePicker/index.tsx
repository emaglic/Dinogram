import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Tooltip, Typography } from "@mui/material";
import ShapeSVG from "@/components/Nodes/Shape/ShapeSVG";
import shapeMap from "@/map/shape-map";
import SquareIcon from "@mui/icons-material/Square";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";

import { useSelector, useDispatch } from "react-redux";
import { createNode } from "@/state/Chart/chartSlice";
import { RootState } from "@/state/store";
import getNewShapeNode from "@/base/nodes/shape";
import { selectNodes } from "@/state/Chart/chartSlice";

const ShapePicker = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();
  const nodes = useSelector(selectNodes);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleCreateNode = (shapeData) => {
    dispatch(createNode(getNewShapeNode(nodes, shapeData)));
    setDialogOpen(false);
  };

  return (
    <>
      <Box>
        <Tooltip
          placement="right"
          arrow
          title={`Create Shape Node`}
          key={`shape-Shape`}
        >
          <SquareIcon
            sx={{ cursor: "pointer" }}
            onClick={() => setDialogOpen(true)}
          />
        </Tooltip>
      </Box>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Pick a Shape"}</DialogTitle>
        <DialogContent>
          <Box sx={styles.iconContainer}>
            {Object.entries(shapeMap).map((shape) => {
              return (
                <Box
                  sx={styles.icon}
                  key={shape[1].key}
                  onClick={() => {
                    handleCreateNode(shape[1]);
                  }}
                >
                  <ShapeSVG
                    key={shape[1].key}
                    component={shape[1].icon}
                    fill={"#000"}
                    stroke={"transparent"}
                    width={"24px"}
                    height={"24px"}
                  />
                  <Typography variant="body2">{shape[1].label}</Typography>
                </Box>
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShapePicker;
