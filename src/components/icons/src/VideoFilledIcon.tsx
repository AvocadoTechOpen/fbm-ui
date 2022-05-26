import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M17,10.5 L17,7 C17,6.45 16.55,6 16,6 L4,6 C3.45,6 3,6.45 3,7 L3,17 C3,17.55 3.45,18 4,18 L16,18 C16.55,18 17,17.55 17,17 L17,13.5 L21,17.5 L21,6.5 L17,10.5 Z M14,13 L11,13 L11,16 L9,16 L9,13 L6,13 L6,11 L9,11 L9,8 L11,8 L11,11 L14,11 L14,13 Z" />
  </SvgIcon>
);

export default Icon;