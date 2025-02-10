import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { useDispatch, useSelector } from "react-redux";
import { updateNode } from "@/state/Chart/chartSlice";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import schemaGenerator from "@/form/SchemaGenerator";
import { selectIsDragging } from "@/state/Chart/settingsSlice";
import ColorPickerControl, {
  colorPickerControlTester,
} from "@/components/Form/ColorPickerControl";
import CustomTextFieldControl, {
  CustomTextFieldTester,
} from "@/components/Form/CustomTextFieldControl";
import HeaderRenderer, { headerTester } from "@/components/Form/HeaderRenderer";

const ElementProperties = ({ selectedChartElements }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();
  const element = selectedChartElements[0];
  const isDragging = useSelector(selectIsDragging);

  const renderers = [
    ...materialRenderers,
    { tester: headerTester, renderer: HeaderRenderer },
    { tester: colorPickerControlTester, renderer: ColorPickerControl },
    { tester: CustomTextFieldTester, renderer: CustomTextFieldControl },
  ];

  const schemas = schemaGenerator
    .setBase("node")
    .setElement(element.type)
    .getSchema();
  const schema = schemas.schema;
  const uischema = schemas.uischema;

  const handleChange = (data) => {
    if (isDragging) return;
    // if (JSON.stringify(data) === JSON.stringify(element)) return;
    dispatch(updateNode(data));
  };

  return (
    <Box sx={styles.container}>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={element}
        renderers={renderers}
        cells={materialCells}
        onChange={({ data, errors }) => handleChange(data)}
      />
    </Box>
  );
};

export default ElementProperties;
