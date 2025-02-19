import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import getNodesTypes from "@/base/nodes";
import { useSelector, useDispatch } from "react-redux";
import { createNode } from "@/state/Chart/chartSlice";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import { RootState } from "@/state/store";
import { selectNodes } from "@/state/Chart/chartSlice";

const BasicNodeGenerator = ({ type, label, Icon, defaultData }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();
  const nodes = useSelector(selectNodes);

  const handleCreateNode = () => {
    dispatch(createNode(defaultData(nodes)));
  };

  return (
    <Tooltip
      placement="right"
      arrow
      title={`Create ${label} Element`}
      key={`${type}-${label}`}
    >
      <Icon sx={{ cursor: "pointer" }} onClick={() => handleCreateNode()} />
    </Tooltip>
  );
};

export default BasicNodeGenerator;
