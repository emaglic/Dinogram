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
import CustomSelect, {
  CustomTextFieldProps,
  UpdateType,
} from "@/components/Form/CustomComponents/CustomSelect";

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

const CustomSelectControl = ({
  data,
  handleChange,
  path,
  uischema,
  schema,
}: Props) => (
  <CustomSelect
    type={schema.type}
    label={uischema.label}
    value={data}
    updateType={schema.options?.updateType || UpdateType.CHANGE}
    uiSchemaOptions={uischema.options}
    schemaOptions={schema.options}
    selectOptions={schema.enum}
    updateValue={(newValue: string) => handleChange(path, newValue)}
  />
);

export default withJsonFormsControlProps(CustomSelectControl);

const hasEnum = schemaMatches(
  (schema) => schema.enum !== undefined && Array.isArray(schema.enum)
);

export const CustomSelectTester = rankWith(
  3, //increase rank as needed
  hasEnum
);
