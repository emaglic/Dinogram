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
} from "@jsonforms/core";
import CustomTextField, {
  CustomTextFieldProps,
} from "@/components/Form/CustomComponents/CustomTextField";

interface Props {
  data: any;
  handleChange(path: string, value: string): void;
  path: string;
  schema: any;
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
    options={uischema.options}
    updateValue={(newValue: string) => handleChange(path, newValue)}
  />
);

export default withJsonFormsControlProps(CustomTextFieldControl);

export const CustomTextFieldTester = rankWith(
  3, //increase rank as needed
  and(
    or(schemaTypeIs("string"), schemaTypeIs("number")), // Matches string or number types
    not(optionIs("fieldType", "select")) // Ensures format is NOT "select"
  )
);
function formatIsNot(arg0: string): import("@jsonforms/core").Tester {
  throw new Error("Function not implemented.");
}
