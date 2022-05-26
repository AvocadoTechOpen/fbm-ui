import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M19,9 L15,9 L15,3 L9,3 L9,9 L5,9 L12,16 L19,9 Z M11,11 L11,5 L13,5 L13,11 L14.17,11 L12,13.17 L9.83,11 L11,11 Z M6,18 L18,18 C18.5522847,18 19,18.4477153 19,19 C19,19.5522847 18.5522847,20 18,20 L6,20 C5.44771525,20 5,19.5522847 5,19 C5,18.4477153 5.44771525,18 6,18 Z" />
  </SvgIcon>
);

export default Icon;