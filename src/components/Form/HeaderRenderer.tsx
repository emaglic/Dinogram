import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import CustomHeader, {
  CustomHeaderProps,
} from "./CustomComponents/CustomHeader";

interface UISchema {
  type: "Header" | "Control";
  label: string;
  options?: {
    variant: CustomHeaderProps["variant"];
    divider?: CustomHeaderProps["divider"];
    margin?: CustomHeaderProps["margin"];
  };
}

interface RendererProps {
  uischema: UISchema;
}

const HeaderRenderer = ({ uischema }: RendererProps) => {
  return (
    <CustomHeader
      label={uischema.label}
      variant={uischema.options?.variant}
      divider={uischema.options?.divider}
      margin={uischema.options?.margin}
    />
  );
};

// JSON Forms requires a tester function to recognize this renderer
const headerTester = (uischema: UISchema) => {
  return uischema.type === "Header" ? 1 : -1;
};

// Wrap it so JSON Forms can inject props
export default withJsonFormsControlProps(HeaderRenderer);

export { headerTester };
