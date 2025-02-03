import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import schemas from "./json";
import { useDispatch, useSelector } from "react-redux";
import { updateNode } from "@/state/Chart/chartSlice";

const ElementProperties = ({ selectedChartElements }) => {
  const dispatch = useDispatch();
  const element = selectedChartElements[0];

  const schema = schemas[element.type].schema;

  const handleChange = (data) => {
    dispatch(updateNode(data));
  };

  return (
    <div>
      <JsonForms
        schema={schema}
        // uischema={uischema}
        data={element}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, errors }) => handleChange(data)}
      />
    </div>
  );
};

export default ElementProperties;
