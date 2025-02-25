import { KeyboardKeysType } from "@/state/Settings/settingsSlice";

export type PatternLabel = "copy" | "paste" | "redo" | "undo" | "delete";

const keyboardPatterns = (pattern: PatternLabel, keys: KeyboardKeysType) => {
  switch (pattern) {
    case "copy": {
      return keys.ctrl && keys.c === 1;
    }
    case "paste": {
      return keys.ctrl && keys.v === 1;
    }
    case "redo": {
      return keys.ctrl && keys.z && keys.shift;
    }
    case "undo": {
      return keys.ctrl && keys.z;
    }
    case "delete": {
      return keys.delete === 1;
    }
  }
};

export default keyboardPatterns;
