import { Box } from "@mui/material";
import React from "react";
import newShapeMap from "@/map/shape-map";
import SvgIcon from "@mui/material/SvgIcon";

interface Props {
  fill?: string;
  stroke?: string;
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
  sx?: any;
  component: any;
}

const ShapeSVG = ({
  fill = "#000",
  stroke = "transparent",
  width = "24px",
  height = "24px",
  onClick,
  component,
  sx = {},
}: Props) => {
  // theme.palette.text.primary
  return (
    <SvgIcon
      component={component} // Pass component directly
      inheritViewBox // Ensures SVG retains its own viewBox
      fill={fill}
      stroke={stroke}
      preserveAspectRatio="none"
      onClick={onClick}
      sx={{
        ...sx,
        width: width || "100%",
        height: height || "100%",
        fontSize: "inherit", // Prevents 24px default sizing
      }}
      viewBox="0 0 960 960" // Override if needed
    />
  );
};

export default ShapeSVG;
