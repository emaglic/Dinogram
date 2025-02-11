import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import { JsonForms } from "@jsonforms/react";
import { renderers, materialCells } from "@/form/renderers";
import schemaDefinitions from "@/form";
import {
  ProjectState,
  selectProject,
  updateProject,
} from "@/state/Chart/projectSlice";
import { compareObjects } from "@/utils/getDiffsDeep";
import { updateManifest } from "@/state/Chart/manifestSlice";
import { Box } from "@mui/material";

const Settings = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();
  const project = useSelector(selectProject);

  const handleChange = (data) => {
    dispatch(updateManifest(data));
    dispatch(updateProject(data));
  };

  const schema = schemaDefinitions.settings.schema;
  const uischema = schemaDefinitions.settings.uischema;

  return (
    <Box sx={styles.container}>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={project}
        renderers={renderers}
        cells={materialCells}
        onChange={({ data, errors }) => handleChange(data)}
      />
    </Box>
  );
};

export default Settings;
