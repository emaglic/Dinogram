import React, { forwardRef, useRef } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Cloud from "@mui/icons-material/Cloud";
import { Menu } from "@mui/material";
import useSelectedChartElements from "@/hooks/useGetSelected";
import {
  duplicateNodes,
  selectChart,
  updateNodes,
} from "@/state/Chart/chartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getToDuplicate } from "@/utils/context-menu";

const ContextMenu = ({ position, handleClose, payload }) => {
  const dispatch = useDispatch();
  const chart = useSelector(selectChart);
  const { nodes, edges } = useSelectedChartElements(chart);

  const handleDuplicate = () => {
    // console.log("payload", payload);
    if (payload) {
      dispatch(duplicateNodes([payload]));
    }
    handleClose();
  };

  const handleDuplicateSelected = () => {
    // const [dupNodes] = getToDuplicate(nodes, edges);
    dispatch(duplicateNodes(nodes));
    handleClose();
  };

  return (
    <Menu
      sx={{ width: 420, maxWidth: "100%" }}
      open={Boolean(position)}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        position ? { top: position.top, left: position.left } : undefined
      }
    >
      <MenuList>
        <MenuItem onClick={handleDuplicate}>
          <ListItemIcon>
            <FileCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
          {/* <Typography
            variant="body2"
            sx={{ color: "text.secondary", marginLeft: "0.5rem" }}
          >
            CTRL + D
          </Typography> */}
        </MenuItem>
        <MenuItem onClick={handleDuplicateSelected}>
          <ListItemIcon>
            <FileCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate Selected</ListItemText>
          {/* <Typography
            variant="body2"
            sx={{ color: "text.secondary", marginLeft: "0.5rem" }}
          >
            CTRL + SHIFT + D
          </Typography> */}
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ⌘C
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ⌘V
          </Typography>
        </MenuItem> */}
      </MenuList>
    </Menu>
  );
};

export default ContextMenu;
