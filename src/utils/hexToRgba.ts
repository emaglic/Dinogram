const hexToRgba = (hex, alpha = 1) => {
  // Remove "#" if present
  hex = hex.replace(/^#/, "");

  // Expand shorthand hex codes like #abc to full form #aabbcc
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Convert hex to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Example usage:
//console.log(hexToRgba("#ff5733", 0.5)); // Output: "rgba(255, 87, 51, 0.5)"

export default hexToRgba;
