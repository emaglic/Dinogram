import { useEffect, useState } from "react";

interface ModifierKeys {
  alt: boolean;
  ctrl: boolean;
  shift: boolean;
  z: boolean; // Tracks if `z` was tapped (not held)
  delete: boolean;
}

const useKeyboardGlobal = () => {
  const [modifierKeys, setModifierKeys] = useState<ModifierKeys>({
    alt: false,
    ctrl: false,
    shift: false,
    z: false,
    delete: false,
  });

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.repeat) return; // Prevent holding down Z from firing multiple times

      //console.log("evt: ", evt);

      setModifierKeys((prev) => ({
        alt: evt.altKey,
        ctrl: evt.ctrlKey,
        shift: evt.shiftKey,
        z: evt.code === "KeyZ" ? true : prev.z, // Set `z` to true when first pressed
        delete: evt.code === "Delete" ? true : prev.delete,
      }));
    };

    const handleKeyUp = (evt: KeyboardEvent) => {
      setModifierKeys((prev) => ({
        alt: evt.altKey,
        ctrl: evt.ctrlKey,
        shift: evt.shiftKey,
        z: evt.code === "KeyZ" ? false : prev.z, // Reset `z` on key release
        delete: evt.code === "Delete" ? false : prev.delete,
      }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return modifierKeys;
};

export default useKeyboardGlobal;
