import { KeyboardKeysType } from "@/state/Chart/settingsSlice";

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
      return keys.ctrl && keys.z === 1 && keys.shift;
    }
    case "undo": {
      return keys.ctrl && keys.z === 1;
    }
    case "delete": {
      return keys.delete === 1;
    }
  }
};

export default keyboardPatterns;
