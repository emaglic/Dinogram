import { Box } from "@mui/material";
import React from "react";

const ShapeBackground = ({ shape, fill, stroke, width, height }) => {
  // Define the SVG shape dynamically
  const svgShapes = {
    circle: `<circle cx="50" cy="50" r="50" fill="${fill}" stroke="${stroke}" stroke-width="5"/>`,
    triangle: `<polygon points="50,5 95,95 5,95" fill="${fill}" stroke="${stroke}" stroke-width="5"/>`,
    square: `<rect x="0" y="0" width="100" height="100" fill="${fill}" stroke="${stroke}" stroke-width="5"/>`,
  };

  // Convert the selected shape into a data URL
  const svgString = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      ${svgShapes[shape] || svgShapes.circle}
    </svg>
  `);

  return (
    <Box
      sx={{
        width: `${width}`,
        height: `${height}`,
        backgroundImage: `url("data:image/svg+xml,${svgString}")`,
        backgroundSize: "100% 100%", // Forces stretch
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    />
  );
};

export default ShapeBackground;
