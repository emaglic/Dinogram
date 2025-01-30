import React, { useEffect, useState } from "react";

interface ModifierKeys {
  alt: boolean;
  ctrl: boolean;
  shift: boolean;
}

const useKeyboard = (ref: React.RefObject<HTMLElement>) => {
  const [modifierKeys, setModifierKeys] = useState<ModifierKeys>({
    alt: false,
    ctrl: false,
    shift: false,
  });

  useEffect(() => {
    if (!ref.current) return; // Ensure ref.current is defined

    const handleKeys = (evt: KeyboardEvent) => {
      setModifierKeys({
        alt: evt.altKey,
        ctrl: evt.ctrlKey,
        shift: evt.shiftKey,
      });
    };

    ref.current.addEventListener("keydown", handleKeys);
    ref.current.addEventListener("keyup", handleKeys);

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("keydown", handleKeys);
        ref.current.removeEventListener("keyup", handleKeys);
      }
    };
  }, [ref.current]); // Re-run effect when ref.current is available

  return modifierKeys;
};

export default useKeyboard;
