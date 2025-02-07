import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";

const DEFAULT_COMPONENT = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();
  const selector = useSelector();
  return <div>DEFAULT_COMPONENT</div>;
};

export default DEFAULT_COMPONENT;
