import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEdges, deleteNodes, redo, undo } from "@/state/Chart/chartSlice";
import useKeyboard from "@/hooks/useKeyboard";
import { selectKeyboardKeys } from "@/state/Chart/settingsSlice";
import keyboardPatterns, { PatternLabel } from "./keyboardPatterns";

const KeyboardEvents = () => {
  const keys = useKeyboard();
  const dispatch = useDispatch();

  const hasPattern = (pattern: PatternLabel) => {
    return keyboardPatterns(pattern, keys);
  };

  useEffect(() => {
    if (hasPattern("copy")) {
      console.log("copy");
      return;
    }

    if (hasPattern("paste")) {
      console.log("paste");
    }

    if (hasPattern("redo")) {
      dispatch(redo());
      return;
    }

    if (hasPattern("undo")) {
      dispatch(undo());
      return;
    }

    if (hasPattern("delete")) {
      dispatch(deleteNodes());
      dispatch(deleteEdges());
      return;
    }
  }, [keys]); // Re-run effect when keys change

  return null;
};

export default KeyboardEvents;
