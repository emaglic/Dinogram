import React, { useEffect, useRef, useState } from "react";
import {
  Handle,
  Position,
  NodeResizer,
  useUpdateNodeInternals,
} from "@xyflow/react";
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
  updateNodeData,
} from "@/state/Chart/chartSlice";
import {
  selectDragLockAxis,
  selectKeyboardKeys,
  setDragLockAxis,
} from "@/state/Settings/settingsSlice";
import { RootState } from "@/state/store";
import { drag } from "d3-drag";
import { select } from "d3-selection";
import useDebounce from "@/hooks/useDebounce";

interface Props {
  id: string;
  children: React.ReactNode;
  minWidth: number;
  minHeight: number;
  selected?: boolean;
  label: string;
  data: {
    rotation: number;
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

  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const [rotation, setRotation] = useState(data.rotation || 0);
  const debouncedRotation = useDebounce(rotation);

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

  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on("drag", (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);

      //dispatch(updateNodeData({ id, data: { rotation: 180 - deg } }));
      setRotation(180 - parseInt(deg));
      updateNodeInternals(id);
    });

    selection.call(dragHandler);
  }, [id, updateNodeInternals, selected]);

  useEffect(() => {
    dispatch(updateNodeData({ id, data: { rotation } }));
  }, [debouncedRotation]);

  useEffect(() => {
    if (data.rotation !== rotation) {
      setRotation(data.rotation);
    }
  }, [data.rotation]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        {selected && (
          <NodeResizer
            onResizeStart={onResizeStart}
            onResize={onResize}
            onResizeEnd={onResizeEnd}
            minWidth={minWidth}
            minHeight={minHeight}
            handleStyle={{
              width: "20px",
              height: "20px",
            }}
          />
        )}
        <Box
          sx={styles.container(
            rotation,
            selected,
            data.visible,
            data?.baseNodeComponent?.autoSize // NOT USED CURRENTLY
          )}
          className={`${
            data?.locked || !data?.visible ? "nodrag" : undefined
          } ${classes.rotatableNode}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onContextMenu={handleSelectNode}
        >
          {data?.baseNodeComponent?.showHeader ? (
            <NodeHeader label={label} />
          ) : null}

          {selected ? (
            <div
              ref={rotateControlRef}
              data-id="rotate-control"
              className={`nodrag ${classes.rotatableNode__handle}`}
            />
          ) : null}

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
          <Box
            sx={{
              overflow: "hidden",
              display: "flex",
              width: "100%",
              height: "100%",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BaseNode;
