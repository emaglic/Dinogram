import React, { useEffect, useState } from "react";

export const useLSLoadJSON = (key, initialValue) => {
  const [values, setValues] = useState(initialValue);

  useEffect(() => {
    if (!key) return;
    const currentValue = localStorage.getItem(key);
    if (currentValue) {
      setValues(JSON.parse(currentValue));
    }
  }, [key]);

  return [key, values];
};

export const loadLSJSON = (key, initialValue) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : initialValue;
};
