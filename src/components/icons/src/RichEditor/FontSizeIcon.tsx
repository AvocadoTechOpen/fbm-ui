import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const FontSizeIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      d="M15,7 L15,8 L11,8 L11,18 L10,18 L10,8 L6,8 L6,7 L15,7 Z M19,12 L19,13 L16.5,13 L16.5,18 L15.5,18 L15.5,13 L13,13 L13,12 L19,12 Z"
      fill="#5C6165"
    ></path>
  </SvgIcon>
);

export default FontSizeIcon;
