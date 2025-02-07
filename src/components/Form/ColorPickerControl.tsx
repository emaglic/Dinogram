import { withJsonFormsControlProps } from "@jsonforms/react";
import ColorPicker from "@/components/Controls/ColorPicker";
import { rankWith, scopeEndsWith } from "@jsonforms/core";

interface RatingControlProps {
  data: any;
  handleChange(path: string, value: string): void;
  path: string;
}

const ColorPickerControl = ({
  data,
  handleChange,
  path,
  schema,
  uischema,
}: RatingControlProps) => (
  <ColorPicker
    value={data}
    label={uischema.label}
    updateValue={(newValue: string) => handleChange(path, newValue)}
  />
);

export default withJsonFormsControlProps(ColorPickerControl);

export const colorPickerControlTester = rankWith(
  3, //increase rank as needed
  scopeEndsWith("color")
);
