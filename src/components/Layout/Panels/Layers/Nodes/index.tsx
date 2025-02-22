import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import { updateNodeOrder } from "@/state/Chart/chartSlice";
import NodeLayer from "@/components/Layout/Panels/Layers/Nodes/NodeLayer";
import { DragAndDrop, DragAndDropItem } from "@/components/DragAndDrop";
import { selectNodes } from "@/state/Chart/chartSlice";
import useContextMenu from "@/hooks/useContextMenu";
import ContextMenu from "@/components/Controls/ContextMenu";
import { selectKeyboardKeys } from "@/state/Chart/settingsSlice";
import { ChartNode } from "@/types/chart/nodes";

const LayersPanel = () => {
  const keyboardKeys = useSelector(selectKeyboardKeys);
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();
  const nodes = useSelector(selectNodes);
  const [localLayers, setLocalLayers] = useState([...nodes].reverse());
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [
    handleContextMenuOpen,
    handleContextMenuClose,
    contextMenuPosition,
    contextMenuPayload,
  ] = useContextMenu();

  const handleDragEnd = (array: ChartNode[]) => {
    const updatedArray = [...array].reverse().map((item, index) => {
      return { ...item, data: { ...item.data, zIndex: index } };
    });

    dispatch(updateNodeOrder(updatedArray));
  };

  useEffect(() => {
    setLocalLayers([...nodes].reverse());
  }, [nodes]);

  return (
    <>
      <ContextMenu
        position={contextMenuPosition}
        handleClose={handleContextMenuClose}
        payload={contextMenuPayload}
      />
      <DragAndDrop
        items={localLayers}
        handleDragEnd={handleDragEnd}
        hoistDraggingState={setIsDragging}
      >
        <Box ref={containerRef} sx={styles.container}>
          {localLayers.map((node) => (
            <DragAndDropItem key={node.id} id={node.id}>
              <NodeLayer
                onContextMenu={(evt: MouseEvent<HTMLElement>): void => {
                  handleContextMenuOpen(evt, node);
                }}
                keyboardKeys={keyboardKeys}
                node={node}
                isDragging={isDragging}
              />
            </DragAndDropItem>
          ))}
        </Box>
      </DragAndDrop>
    </>
  );
};

export default LayersPanel;
