import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M16,3 L5,3 C3.9,3 3,3.9 3,5 L3,19 C3,20.1 3.9,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,8 L16,3 Z M15.1,5 L15.1,8.9 L19,8.9 L15.1,5 Z M15.1111111,5 L19,8.88888889 L19,19 L5,19 L5,5 L15.1111111,5 Z M17,15 L7,15 L7,17 L17,17 L17,15 Z M17,11 L7,11 L7,13 L17,13 L17,11 Z M12,7 L7,7 L7,9 L12,9 L12,7 Z" />
  </SvgIcon>
);

export default Icon;