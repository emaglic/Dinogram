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
import { onSelectNode, selectNodeById } from "@/state/Chart/chartSlice";
import { selectKeyboardKeys } from "@/state/Settings/settingsSlice";
import { RootState } from "@/state/store";

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

  const handleSelectNode = () => {
    if (node && !node.selected) {
      dispatch(onSelectNode({ id: node.id, keyboardKeys }));
    }
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
