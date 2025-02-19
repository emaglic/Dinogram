type ThemeMode = "light" | "dark";

let globalThemeMode: ThemeMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches
  ? "dark"
  : "light"; // Default value

export function getMuiThemeMode(): ThemeMode {
  return globalThemeMode;
}

export function setMuiThemeMode(mode: ThemeMode) {
  globalThemeMode = mode;
}
