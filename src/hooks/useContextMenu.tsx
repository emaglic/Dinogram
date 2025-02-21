import React, { useState, useEffect } from "react";

const useContextMenu = () => {
  const [position, setPosition] = useState(null);
  const [payload, setPayload] = useState(null);

  const handleOpen = (evt, _payload) => {
    // evt.preventDefault();
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
