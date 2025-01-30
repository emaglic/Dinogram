const getSVGShape = (shape, fill, stroke) => {
  const svgShapes = {
    circle: `<circle cx="50" cy="50" r="40" fill="${fill}" stroke="${stroke}" stroke-width="5"/>`,
    triangle: `<polygon points="50,10 90,90 10,90" fill="${fill}" stroke="${stroke}" stroke-width="5"/>`,
    square: `<rect x="10" y="10" width="80" height="80" fill="${fill}" stroke="${stroke}" stroke-width="5"/>`,
  };
  return svgShapes[shape];
};

const getSVGString = (shape, width, height, fill, stroke) => {
  const svg = getSVGShape(shape, fill, stroke);
  const svgString = encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 100 100">
          ${svg}
        </svg>
      `);
  return svgString;
};

const getSVGBackground = (shape, width, height, fill, stroke) => {
  const svgString = getSVGString(shape, width, height, fill, stroke);
  return `data:image/svg+xml,${svgString}`;
};

export default { getSVGShape, getSVGString, getSVGBackground };
