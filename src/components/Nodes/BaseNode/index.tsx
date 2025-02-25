import React, { useEffect, useState } from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import { Box } from "@mui/material";
import NodeHeader from "./NodeHeader";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.styles";
import classes from "./index.module.css";
import useContextMenu from "@/hooks/useContextMenu";
import ContextMenu from "@/components/Controls/ContextMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  onNodesChange,
  onSelectNode,
  selectNodeById,
} from "@/state/Chart/chartSlice";
import {
  selectDragLockAxis,
  selectKeyboardKeys,
  setDragLockAxis,
} from "@/state/Settings/settingsSlice";
import { RootState } from "@/state/store";
import { set } from "lodash";

interface Props {
  id: string;
  children: React.ReactNode;
  minWidth: number;
  minHeight: number;
  selected?: boolean;
  label: string;
  data: {
    visible: boolean;
    label: string;
    id: string;
    locked: boolean;
    baseNodeComponent?: {
      showHeader?: boolean;
      autoSize?: boolean;
    };
  };
  type: string;
}

const BaseNode = ({
  id,
  children,
  minWidth = 100,
  minHeight = 100,
  selected,
  label,
  type,
  data,
}: Props) => {
  const dispatch = useDispatch();
  const keyboardKeys = useSelector(selectKeyboardKeys);
  const theme = useTheme();
  const styles = Styles(theme);
  const [hovered, setHovered] = useState(false);
  const node = useSelector((state: RootState) => selectNodeById(state, id));
  const dragLockAxis = useSelector(selectDragLockAxis);

  const [startingResizeMousePos, setStartingResizeMousePos] = useState({
    x: 0,
    y: 0,
  });

  const handleSelectNode = () => {
    if (node && !node.selected) {
      dispatch(onSelectNode({ id: node.id, keyboardKeys }));
    }
  };

  const onResizeStart = (evt) => {
    if (evt.sourceEvent.shiftKey) {
      // Lock axis based on initial drag movement
      dispatch(setDragLockAxis(null)); // Reset previous lock
    }
    setStartingResizeMousePos({ x: evt.x, y: evt.y });
  };

  const onResize = (evt, node) => {
    if (!evt.sourceEvent.shiftKey) {
      dispatch(setDragLockAxis(null));
      return;
    }

    // Determine initial drag direction
    if (dragLockAxis === null) {
      if (
        Math.abs(evt.x - startingResizeMousePos.x) >
        Math.abs(evt.y - startingResizeMousePos.y)
      ) {
        dispatch(setDragLockAxis("x"));
      } else {
        dispatch(setDragLockAxis("y"));
      }
    }
  };

  const onResizeEnd = (evt) => {
    setStartingResizeMousePos({ x: evt.x, y: evt.y });
    dispatch(setDragLockAxis(null));
  };

  return (
    <>
      <Box
        sx={styles.container(
          selected,
          data.visible,
          data?.baseNodeComponent?.autoSize // NOT USED CURRENTLY
        )}
        className={`${data?.locked || !data?.visible ? "nodrag" : undefined}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onContextMenu={handleSelectNode}
      >
        {data?.baseNodeComponent?.showHeader ? (
          <NodeHeader label={label} />
        ) : null}

        {selected && (
          <NodeResizer
            onResizeStart={onResizeStart}
            onResize={onResize}
            onResizeEnd={onResizeEnd}
            minWidth={minWidth}
            minHeight={minHeight}
            handleStyle={{
              width: "10px",
              height: "10px",
            }}
          />
        )}

        <Handle
          className={hovered ? classes.handle : classes.handleHidden}
          type="target"
          position={Position.Top}
          id="top-handle-target"
        />
        <Handle
          className={hovered ? classes.handle : classes.handleHidden}
          type="target"
          position={Position.Right}
          id="right-handle-target"
        />
        <Handle
          className={hovered ? classes.handle : classes.handleHidden}
          type="target"
          position={Position.Bottom}
          id="bottom-handle-target"
        />
        <Handle
          className={hovered ? classes.handle : classes.handleHidden}
          type="target"
          position={Position.Left}
          id="left-handle-target"
        />

        <Handle
          className={hovered ? classes.handle : classes.handleHidden}
          type="source"
          position={Position.Top}
          id="top-handle-source"
        />
        <Handle
          className={hovered ? classes.handle : classes.handleHidden}
          type="source"
          position={Position.Right}
          id="right-handle-source"
        />
        <Handle
          className={hovered ? classes.handle : classes.handleHidden}
          type="source"
          position={Position.Bottom}
          id="bottom-handle-source"
        />
        <Handle
          className={hovered ? classes.handle : classes.handleHidden}
          type="source"
          position={Position.Left}
          id="left-handle-source"
        />
        {children}
      </Box>
      {/* <ContextMenu
        position={contextMenuPosition}
        handleClose={handleContextMenuClose}
        payload={contextMenuPayload}
      /> */}
    </>
  );
};

export default BaseNode;
