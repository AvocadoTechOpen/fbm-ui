import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M9.3,4 L9.3,6.66666667 L14.7,6.66666667 L14.7,4 L21,4 L21,11.1111111 L14.7,11.1111111 L14.7,8.44444444 L12.9,8.44444444 L12.9,15.5555556 L14.7,15.5555556 L14.7,12.8888889 L21,12.8888889 L21,20 L14.7,20 L14.7,17.3333333 L11.1,17.3333333 L11.1,8.44444444 L9.3,8.44444444 L9.3,11.1111111 L3,11.1111111 L3,4 L9.3,4 Z M19,15 L17,15 L17,18 L19,18 L19,15 Z M7,6 L5,6 L5,9 L7,9 L7,6 Z M19,6 L17,6 L17,9 L19,9 L19,6 Z" />
  </SvgIcon>
);

export default Icon;