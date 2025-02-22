import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEdges, deleteNodes, redo, undo } from "@/state/Chart/chartSlice";
import useKeyboard from "@/hooks/useKeyboard";
import { selectKeyboardKeys } from "@/state/Chart/settingsSlice";

const KeyboardEvents = () => {
  useKeyboard();
  const dispatch = useDispatch();
  const keys = useSelector(selectKeyboardKeys);

  useEffect(() => {
    if (keys.ctrl && keys.z === 1) {
      if (keys.shift) {
        dispatch(redo());
      } else {
        dispatch(undo());
      }
    }
    if (keys.delete === 1) {
      dispatch(deleteNodes());
      dispatch(deleteEdges());
    }
  }, [keys]); // Re-run effect when keys change

  return null;
};

export default KeyboardEvents;
