import { setKeyboardKeys } from "@/state/Settings/settingsSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface KeyboardState {
  alt: number;
  ctrl: number;
  shift: number;
  z: number;
  c: number;
  v: number;
}

// Handles keyboard events and updates the Redux store with the current state of modifier keys.
// 0 = key not pressed, 1 = key pressed, 2 = key held down.
const useKeyboard = () => {
  const dispatch = useDispatch();
  const [keys, setKeys] = useState<KeyboardState>({
    alt: 0,
    ctrl: 0,
    shift: 0,
    z: 0,
    c: 0,
    v: 0,
  });

  // Helper function to update state for a specific key based on its code.
  const getUpdatedKeyState = (code: string, value: number) => {
    switch (code) {
      case "AltLeft":
      case "AltRight":
        return { alt: value };
      case "ControlLeft":
      case "ControlRight":
        return { ctrl: value };
      case "ShiftLeft":
      case "ShiftRight":
        return { shift: value };
      case "Delete":
        return { delete: value };
      case "KeyZ":
        return { z: value };
      case "KeyC":
        return { c: value };
      case "KeyV":
        return { v: value };
      default:
        return {};
    }
  };

  const updateKeyState = (code: string, value: number) => {
    const keyUpdate = getUpdatedKeyState(code, value);
    if (Object.keys(keyUpdate).length === 0) return;

    // Get the key being updated (e.g. 'alt', 'ctrl', etc.)
    const key = Object.keys(keyUpdate)[0] as keyof KeyboardState;

    setKeys((prev) => {
      // Only update if the value actually changes
      if (prev[key] === keyUpdate[key]) {
        return prev;
      }
      return { ...prev, ...keyUpdate };
    });
  };

  // Dispatch updated keys state whenever it changes.
  useEffect(() => {
    dispatch(setKeyboardKeys(keys));
  }, [keys, dispatch]);

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      // Use evt.repeat to set the correct value (1 for initial press, Date.now() for held)
      const value = evt.repeat ? Date.now() : 1;
      updateKeyState(evt.code, value);
    };

    const handleKeyUp = (evt: KeyboardEvent) => {
      updateKeyState(evt.code, 0);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keys;
};

export default useKeyboard;
