import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import { selectEdges, updateEdgeOrder } from "@/state/Chart/chartSlice";
import { DragAndDrop, DragAndDropItem } from "@/components/DragAndDrop";
import EdgeLayer from "./EdgeLayer";
import { selectKeyboardKeys } from "@/state/Chart/settingsSlice";
import { ChartEdge } from "@/types/chart/edges";

const LayersPanel = () => {
  const keyboardKeys = useSelector(selectKeyboardKeys);
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();
  const edges = useSelector(selectEdges);
  const [localLayers, setLocalLayers] = useState([...edges].reverse());
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (array: ChartEdge[]) => {
    setIsDragging(false);
    const updatedArray = [...array].reverse().map((item, index) => {
      return { ...item, data: { ...item.data, zIndex: index } };
    });

    dispatch(updateEdgeOrder(updatedArray));
  };

  useEffect(() => {
    setLocalLayers([...edges].reverse());
  }, [edges]);

  return (
    <DragAndDrop
      items={localLayers}
      handleDragEnd={handleDragEnd}
      hoistDraggingState={setIsDragging}
    >
      <Box ref={containerRef} sx={styles.container}>
        {localLayers.map((edge) => (
          <DragAndDropItem key={edge.id} id={edge.id}>
            <EdgeLayer
              keyboardKeys={keyboardKeys}
              edge={edge}
              isDragging={isDragging}
            />
          </DragAndDropItem>
        ))}
      </Box>
    </DragAndDrop>
  );
};

export default LayersPanel;
