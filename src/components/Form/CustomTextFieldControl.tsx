import { withJsonFormsControlProps } from "@jsonforms/react";
import ColorPicker from "@/components/Controls/ColorPicker";
import {
  rankWith,
  or,
  schemaTypeIs,
  and,
  not,
  formatIs,
  optionIs,
  schemaMatches,
} from "@jsonforms/core";
import CustomTextField, {
  CustomTextFieldProps,
  UpdateType,
} from "@/components/Form/CustomComponents/CustomTextField";

interface Props {
  data: any;
  handleChange(path: string, value: string): void;
  path: string;
  schema: {
    type: CustomTextFieldProps["type"];
    options?: {
      updateType?: CustomTextFieldProps["updateType"];
    };
  };
  uischema: {
    label?: string;
    options?: CustomTextFieldProps["options"];
  };
}

const CustomTextFieldControl = ({
  data,
  handleChange,
  path,
  uischema,
  schema,
}: Props) => (
  <CustomTextField
    type={schema.type}
    label={uischema.label}
    value={data}
    updateType={schema.options?.updateType || UpdateType.CHANGE}
    options={uischema.options}
    updateValue={(newValue: string) => handleChange(path, newValue)}
  />
);

export default withJsonFormsControlProps(CustomTextFieldControl);

const hasEnum = schemaMatches(
  (schema) => schema.enum !== undefined && Array.isArray(schema.enum)
);

export const CustomTextFieldTester = rankWith(
  3, //increase rank as needed
  and(
    or(schemaTypeIs("string"), schemaTypeIs("number")), // Matches string or number types
    not(hasEnum) // Ensures format is NOT "select"
  )
);
