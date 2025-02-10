import ColorPickerControl, {
  colorPickerControlTester,
} from "@/components/Form/ColorPickerControl";
import CustomTextFieldControl, {
  CustomTextFieldTester,
} from "@/components/Form/CustomTextFieldControl";
import HeaderRenderer, { headerTester } from "@/components/Form/HeaderRenderer";
import {
  materialRenderers,
  materialCells as _materialCells,
} from "@jsonforms/material-renderers";

export const renderers = [
  ...materialRenderers,
  { tester: headerTester, renderer: HeaderRenderer },
  { tester: colorPickerControlTester, renderer: ColorPickerControl },
  { tester: CustomTextFieldTester, renderer: CustomTextFieldControl },
];

export const materialCells = _materialCells;
