import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import schemas from "./json";
import { useDispatch, useSelector } from "react-redux";
import { updateNode } from "@/state/Chart/chartSlice";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";

const ElementProperties = ({ selectedChartElements }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();
  const element = selectedChartElements[0];

  const schema = schemas[element.type].schema;
  const uischema = schemas[element.type].uischema;

  const handleChange = (data) => {
    if (JSON.stringify(data) === JSON.stringify(element)) return;
    dispatch(updateNode(data));
  };

  return (
    <Box>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={element}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, errors }) => handleChange(data)}
      />
    </Box>
  );
};

export default ElementProperties;
