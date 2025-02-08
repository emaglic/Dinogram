import { Box, Typography, Divider } from "@mui/material";
import React from "react";

export interface CustomHeaderProps {
  label: string;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "overline"
    | "srOnly";
  divider?: {
    top?: "main" | "sub";
    bottom?: "main" | "sub";
  };
  margin?: string;
}

const getDividerMargin = (divider) => {
  switch (divider) {
    case "main":
      return "0 -1rem";
    case "sub":
      return "0";
    default:
      return "0";
  }
};

const CustomHeader = ({
  label,
  variant,
  divider,
  margin,
}: CustomHeaderProps) => {
  const dividerTopMargin = getDividerMargin(divider?.top);

  return (
    <Box>
      {divider?.top && (
        <Divider
          sx={{
            margin: dividerTopMargin,
            marginTop: "0.5rem",
          }}
        />
      )}
      <Typography
        variant={variant || "body1"}
        component={"p"}
        fontWeight={500}
        sx={{
          margin: margin || "1rem 0",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default CustomHeader;
