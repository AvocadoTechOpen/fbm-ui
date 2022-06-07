import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M13.8,3 C14.799,3 15.6,3.801 15.6,4.8 L15.6,6.6 L19.2,6.6 C20.199,6.6 21,7.401 21,8.4 L21,18.3 C21,19.299 20.199,20.1 19.2,20.1 L4.8,20.1 C3.801,20.1 3,19.299 3,18.3 L3.009,8.4 C3.009,7.401 3.801,6.6 4.8,6.6 L8.4,6.6 L8.4,4.8 C8.4,3.801 9.201,3 10.2,3 L13.8,3 Z M19.2,8.4 L4.8,8.4 L4.8,18.3 L19.2,18.3 L19.2,8.4 Z M15,10 L15,12 L9,12 L9,10 L15,10 Z M13.8,4.8 L10.2,4.8 L10.2,6.6 L13.8,6.6 L13.8,4.8 Z" />
  </SvgIcon>
);

export default Icon;