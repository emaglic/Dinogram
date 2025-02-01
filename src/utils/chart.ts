function isChartEmpty(obj) {
  if (obj === null || obj === undefined || obj === "") return true;

  if (Array.isArray(obj)) return obj.length === 0;

  if (typeof obj === "object") {
    return (
      Object.keys(obj).length === 0 || Object.values(obj).every(isChartEmpty)
    );
  }

  return false; // If it's a non-empty string, number, boolean, or any other valid value, return false
}

export default isChartEmpty;
