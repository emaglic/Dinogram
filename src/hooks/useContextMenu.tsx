import { onSelectNode } from "@/state/Chart/chartSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectKeyboardKeys } from "@/state/Chart/settingsSlice";

const useContextMenu = () => {
  const dispatch = useDispatch();
  const keyboardKeys = useSelector(selectKeyboardKeys);

  const [position, setPosition] = useState(null);
  const [payload, setPayload] = useState(null);

  const handleOpen = (evt, _payload) => {
    // evt.preventDefault();

    if (!_payload.selected) {
      dispatch(onSelectNode({ id: _payload.id, keyboardKeys }));
    }

    setPosition({
      top: evt.clientY,
      left: evt.clientX,
    });
    if (_payload) setPayload(_payload);
  };

  const handleCaptureContextMenu = (evt) => {
    evt.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleCaptureContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleCaptureContextMenu);
    };
  }, [position]);

  /* useEffect(() => {
    console.log("position: ", position);
    console.log("payload: ", payload);
  }, [position, payload]); */

  const handleClose = () => {
    setPosition(null);
  };

  return [handleOpen, handleClose, position, payload];
};

export default useContextMenu;
