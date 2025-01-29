import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Box } from "@mui/material";

const ITEM_TYPE = "COMPONENT";

const DraggableItem = ({ index, moveItem, endDrag, onDragStart, children }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { index },
    end: endDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    hover: (draggedItem, monitor) => {
      if (!ref.current) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (draggedItem.index < index && hoverClientY < hoverMiddleY) return;
      if (draggedItem.index > index && hoverClientY > hoverMiddleY) return;

      moveItem(draggedItem.index, index);
      draggedItem.index = index;
    },
  }));

  drag(drop(ref));

  return (
    <Box
      ref={ref}
      sx={{
        cursor: "move",
        //padding: "8px",
        backgroundColor: isDragging ? "#f0f0f0" : "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: "4px",
        opacity: isDragging ? 0.5 : 1,
      }}
      onMouseUp={endDrag}
      onMouseDown={onDragStart}
    >
      {children}
    </Box>
  );
};

export default DraggableItem;
