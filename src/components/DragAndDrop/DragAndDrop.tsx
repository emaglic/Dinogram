import React, { useState } from "react";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box } from "@mui/material";

const getLayerPosition = (items, id) =>
  items.findIndex((item) => item.id === id);

const DragAndDrop = ({ children, items, handleDragEnd }) => {
  const [isDragging, setIsDragging] = useState(false);

  const internalHandleDragEnd = (evt) => {
    const { active, over } = evt;
    if (!active?.id || !over?.id) return;
    if (active.id === over.id) return;

    const originalPos = getLayerPosition(items, active.id);
    const newPos = getLayerPosition(items, over.id);
    setIsDragging(false);
    handleDragEnd(arrayMove(items, originalPos, newPos));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.01,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Box sx={{ height: "100%", overflowY: "auto" }} data-id="DragAndDrop">
      <DndContext
        sensors={sensors}
        onDragStart={() => {
          setIsDragging(true);
        }}
        onDragEnd={internalHandleDragEnd}
        collisionDetection={closestCorners}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {children}
        </SortableContext>
      </DndContext>
    </Box>
  );
};

export default DragAndDrop;
