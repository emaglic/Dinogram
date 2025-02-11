import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteNodes, redo, undo } from "@/state/Chart/chartSlice";
import useKeyboardGlobal from "@/hooks/useKeyboardGlobal";

const KeyboardEvents = () => {
  const dispatch = useDispatch();
  const keys = useKeyboardGlobal();

  useEffect(() => {
    console.log("keys: ", keys);
    if (keys.ctrl && keys.z) {
      if (keys.shift) {
        dispatch(redo());
      } else {
        dispatch(undo());
      }
    }
    if (keys.delete) {
      dispatch(deleteNodes());
    }
  }, [keys]); // Re-run effect when keys change

  return null;
};

export default KeyboardEvents;
