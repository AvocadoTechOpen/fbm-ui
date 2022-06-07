import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M9.56,8 L7.56,6 L3.41,1.86 L2,3.27 L4.73,6 L4,6 C3.45,6 3,6.45 3,7 L3,17 C3,17.55 3.45,18 4,18 L16,18 C16.21,18 16.39,17.92 16.55,17.82 L19.73,21 L21.14,19.59 L12.28,10.73 L9.56,8 Z M5,16 L5,8 L6.73,8 L14.73,16 L5,16 Z M15,8 L15,10.61 L21,16.61 L21,6.5 L17,10.5 L17,7 C17,6.45 16.55,6 16,6 L10.39,6 L12.39,8 L15,8 Z" />
  </SvgIcon>
);

export default Icon;