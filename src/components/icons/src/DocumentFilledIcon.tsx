import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M14,2 L6,2 C4.9,2 4.01,2.9 4.01,4 L4,20 C4,21.1 4.89,22 5.99,22 L18,22 C19.1,22 20,21.1 20,20 L20,8 L14,2 Z M16,18 L8,18 L8,16 L16,16 L16,18 Z M16,14 L8,14 L8,12 L16,12 L16,14 Z M13,9 L13,3.5 L18.5,9 L13,9 Z" />
  </SvgIcon>
);

export default Icon;