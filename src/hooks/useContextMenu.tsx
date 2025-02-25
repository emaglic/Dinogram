import { onSelectNode } from "@/state/Chart/chartSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectKeyboardKeys } from "@/state/Settings/settingsSlice";
import { ChartNode } from "@/types/chart/nodes";
import { ChartEdge } from "@/types/chart/edges";

interface Position {
  top: number;
  left: number;
}

type Payload = ChartNode | ChartEdge;

const useContextMenu = () => {
  const dispatch = useDispatch();
  const keyboardKeys = useSelector(selectKeyboardKeys);

  const [position, setPosition] = useState<Position | null>(null);
  const [payload, setPayload] = useState<Payload | null>(null);

  const handleOpen = (evt: MouseEvent, _payload?: Payload) => {
    // evt.preventDefault();

    if (_payload && !_payload.selected) {
      dispatch(onSelectNode({ id: _payload?.id, keyboardKeys }));
    }

    setPosition({
      top: evt.clientY,
      left: evt.clientX,
    });
    if (_payload) setPayload(_payload);
  };

  const handleCaptureContextMenu = (evt: MouseEvent) => {
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
