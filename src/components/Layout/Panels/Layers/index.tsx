import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { RootState } from "../../../../state/store";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import { onSelectNode, updateNodeOrder } from "@/state/Chart/chartSlice";
import NodeLayer from "@/components/Layout/Panels/Layers/node";
import { DragAndDrop, DragAndDropItem } from "@/components/DragAndDrop";
import useKeyboard from "@/hooks/useKeyboard";
import { selectNodes } from "@/state/Chart/chartSlice";

const LayersPanel = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();
  const nodes = useSelector(selectNodes);
  const [localLayers, setLocalLayers] = useState([...nodes].reverse());
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDragEnd = (array) => {
    const updatedArray = [...array].reverse().map((item, index) => {
      return { ...item, data: { ...item.data, zIndex: index } };
    });

    dispatch(updateNodeOrder(updatedArray));
  };

  useEffect(() => {
    setLocalLayers([...nodes].reverse());
  }, [nodes]);

  const modifierKeys = useKeyboard(containerRef);

  return (
    <DragAndDrop items={localLayers} handleDragEnd={handleDragEnd}>
      <Box ref={containerRef} sx={styles.container}>
        {localLayers.map((node) => (
          <DragAndDropItem key={node.id} id={node.id}>
            <NodeLayer modifierKeys={modifierKeys} node={node} />
          </DragAndDropItem>
        ))}
      </Box>
    </DragAndDrop>
  );
};

export default LayersPanel;
