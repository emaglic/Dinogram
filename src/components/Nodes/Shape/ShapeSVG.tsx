import { Box } from "@mui/material";
import React from "react";
import newShapeMap from "@/map/shape-map";
import SvgIcon from "@mui/material/SvgIcon";

interface Props {
  fill?: {
    color?: string;
    opacity?: number;
  };
  stroke?: {
    color?: string;
    width?: number;
    opacity?: number;
  };
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
  sx?: any;
  component: any;
}

const ShapeSVG = ({
  fill,
  stroke,
  width = "24px",
  height = "24px",
  onClick,
  component,
  sx = {},
}: Props) => {
  const fillOpacity = fill?.opacity ? fill.opacity / 100 : 1;
  const strokeOpacity = stroke?.opacity ? stroke.opacity / 100 : 1;

  return (
    <SvgIcon
      component={component} // Pass component directly
      inheritViewBox // Ensures SVG retains its own viewBox
      //fill={fill}
      stroke={stroke?.color || "#000"}
      preserveAspectRatio="none"
      onClick={onClick}
      sx={{
        ...sx,
        fill: fill?.color || "currentColor",
        fillOpacity: fillOpacity,
        strokeWidth: stroke?.width || 0,
        strokeOpacity: strokeOpacity,
        width: width || "100%",
        height: height || "100%",
        fontSize: "inherit", // Prevents 24px default sizing
      }}
      viewBox="0 0 960 960" // Override if needed
    />
  );
};

export default ShapeSVG;
