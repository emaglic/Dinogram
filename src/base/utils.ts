import { getMuiThemeMode } from "@/themeMode";

export const getDefaultThemeModeColor = (contrast: boolean = false) => {
  if (contrast) {
    return getMuiThemeMode() === "light" ? "#ffffff" : "#000000";
  }
  return getMuiThemeMode() === "light" ? "#000000" : "#ffffff";
};
