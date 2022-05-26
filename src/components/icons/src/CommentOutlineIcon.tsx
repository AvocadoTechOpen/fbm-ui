import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M18.4,4 L5.6,4 C4.72,4 4.008,4.72 4.008,5.6 L4,20 L7.2,16.8 L18.4,16.8 C19.28,16.8 20,16.08 20,15.2 L20,5.6 C20,4.72 19.28,4 18.4,4 Z M6,6 L18,6 L18,15 L6,15 L6,6 Z M8.8,13.6 L7.2,13.6 L7.2,12 L8.8,12 L8.8,13.6 Z M8.8,11.2 L7.2,11.2 L7.2,9.6 L8.8,9.6 L8.8,11.2 Z M8.8,8.8 L7.2,8.8 L7.2,7.2 L8.8,7.2 L8.8,8.8 Z M14.4,13.6 L10.4,13.6 L10.4,12 L14.4,12 L14.4,13.6 Z M16.8,11.2 L10.4,11.2 L10.4,9.6 L16.8,9.6 L16.8,11.2 Z M16.8,8.8 L10.4,8.8 L10.4,7.2 L16.8,7.2 L16.8,8.8 Z" />
  </SvgIcon>
);

export default Icon;