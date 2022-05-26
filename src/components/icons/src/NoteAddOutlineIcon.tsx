import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M13,11 L11,11 L11,14 L8,14 L8,16 L11,16 L11,19 L13,19 L13,16 L16,16 L16,14 L13,14 L13,11 Z M14,2 L6,2 C4.9,2 4,2.9 4,4 L4,20 C4,21.1 4.89,22 5.99,22 L18,22 C19.1,22 20,21.1 20,20 L20,8 L14,2 Z M18,20 L6,20 L6,4 L13,4 L13,9 L18,9 L18,20 Z" />
  </SvgIcon>
);

export default Icon;