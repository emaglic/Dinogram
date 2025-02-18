import ColorPickerControl, {
  colorPickerControlTester,
} from "@/components/Form/ColorPickerControl";
import CustomSelectControl, {
  CustomSelectTester,
} from "@/components/Form/CustomSelectControl";
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
  { renderer: HeaderRenderer, tester: headerTester },
  { renderer: ColorPickerControl, tester: colorPickerControlTester },
  { renderer: CustomTextFieldControl, tester: CustomTextFieldTester },
  { renderer: CustomSelectControl, tester: CustomSelectTester },
];

export const materialCells = _materialCells;
