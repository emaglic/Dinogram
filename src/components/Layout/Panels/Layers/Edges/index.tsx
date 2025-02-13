import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { RootState } from "../../../../state/store";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import {
  onSelectNode,
  selectEdges,
  updateNodeOrder,
} from "@/state/Chart/chartSlice";
import NodeLayer from "@/components/Layout/Panels/Layers/Nodes/NodeLayer";
import { DragAndDrop, DragAndDropItem } from "@/components/DragAndDrop";
import useKeyboard from "@/hooks/useKeyboard";
import { selectNodes } from "@/state/Chart/chartSlice";
import EdgeLayer from "./EdgeLayer";

const LayersPanel = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();
  const edges = useSelector(selectEdges);
  const [localLayers, setLocalLayers] = useState([...edges].reverse());
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDragEnd = (array) => {
    const updatedArray = [...array].reverse().map((item, index) => {
      return { ...item, data: { ...item.data, zIndex: index } };
    });

    dispatch(updateNodeOrder(updatedArray));
  };

  useEffect(() => {
    setLocalLayers([...edges].reverse());
  }, [edges]);

  const modifierKeys = useKeyboard(containerRef);

  return (
    <DragAndDrop items={localLayers} handleDragEnd={handleDragEnd}>
      <Box ref={containerRef} sx={styles.container}>
        {localLayers.map((edge) => (
          <DragAndDropItem key={edge.id} id={edge.id}>
            <EdgeLayer modifierKeys={modifierKeys} edge={edge} />
          </DragAndDropItem>
        ))}
      </Box>
    </DragAndDrop>
  );
};

export default LayersPanel;
