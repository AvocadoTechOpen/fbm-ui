import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const CenterIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      d="M16,16 L16,17 L8,17 L8,16 L16,16 Z M18,13 L18,14 L6,14 L6,13 L18,13 Z M16,10 L16,11 L8,11 L8,10 L16,10 Z M18,7 L18,8 L6,8 L6,7 L18,7 Z"
      fill="#5C6165"
      transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) "
    ></path>
  </SvgIcon>
);

export default CenterIcon;
