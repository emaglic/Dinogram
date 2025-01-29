import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RootState } from "../../../../state/store";
import { useTheme } from "@mui/material/styles";
import Styles, { NodeStyles } from "./index.style";
import { onSelectNode, updateNodeOrder } from "@/state/Chart/chartSlice";
import DraggableItem from "@/components/Draggable";

const LayersPanel = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.chart.nodes);

  const [localLayers, setLocalLayers] = useState([...nodes].reverse());
  const localLayersRef = useRef(localLayers);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!isDragging.current) {
      console.log("update nodes");
      setLocalLayers([...nodes].reverse());
    }
  }, [nodes]);

  useEffect(() => {
    localLayersRef.current = localLayers;
  }, [localLayers]);

  const moveItem = (fromIndex, toIndex) => {
    setLocalLayers((prevLayers) => {
      const updatedOrder = [...prevLayers];
      const [movedItem] = updatedOrder.splice(fromIndex, 1);
      const newMovedItem = {
        ...movedItem,
        data: { ...movedItem.data, zIndex: toIndex },
      };
      updatedOrder.splice(toIndex, 0, newMovedItem);
      return updatedOrder;
    });
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    dispatch(updateNodeOrder([...localLayersRef.current].reverse()));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box>
        {localLayers.map((layer, index) => (
          <DraggableItem
            key={layer.id}
            index={index}
            moveItem={moveItem}
            endDrag={handleDragEnd}
            onDragStart={() => (isDragging.current = true)}
          >
            <Box
              sx={{
                ...styles.node,
                ...NodeStyles(theme, layer),
              }}
              onClick={() => dispatch(onSelectNode(layer))}
            >
              {layer.data?.label ? layer.data.label : layer.id}
            </Box>
          </DraggableItem>
        ))}
      </Box>
    </DndProvider>
  );
};

export default LayersPanel;
