import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M20,4 L4,4 C2.9,4 2.01,4.9 2.01,6 L2,18 C2,19.1 2.9,20 4,20 L20,20 C21.1,20 22,19.1 22,18 L22,6 C22,4.9 21.1,4 20,4 Z M20,18 L4,18 L4,8 L11.8728003,12.9205002 C11.9506251,12.9691407 12.0493749,12.9691407 12.1271997,12.9205002 L20,8 L20,8 L20,18 Z M12,11 L4,6 L20,6 L12,11 Z" />
  </SvgIcon>
);

export default Icon;