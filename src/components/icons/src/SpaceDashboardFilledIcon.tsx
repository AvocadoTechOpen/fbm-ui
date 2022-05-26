import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M20.2,3 C20.6418278,3 21,3.3581722 21,3.8 L21,20.2 C21,20.6418278 20.6418278,21 20.2,21 L3.8,21 C3.3581722,21 3,20.6418278 3,20.2 L3,3.8 C3,3.3581722 3.3581722,3 3.8,3 L20.2,3 Z M11,3 L13,3 L13,21 L11,21 L11,3 Z M21,10 L21,12 L13,12 L13,10 L21,10 Z" />
  </SvgIcon>
);

export default Icon;