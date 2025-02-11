import { Box } from "@mui/material";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DragAndDropItem = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    cursor: "auto",
  };

  return (
    <Box style={style} ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </Box>
  );
};

export default DragAndDropItem;
