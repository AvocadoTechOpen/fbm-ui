import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const FontColorIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      d="M11,0 C11.5522847,0 12,0.44771525 12,1 L12,11 C12,11.5522847 11.5522847,12 11,12 L1,12 C0.44771525,12 0,11.5522847 0,11 L0,1 C0,0.44771525 0.44771525,0 1,0 L11,0 Z M11,1 L1,1 L1,11 L11,11 L11,1 Z"
      fill="#5C6165"
      fillRule="nonzero"
    ></path>
  </SvgIcon>
);

export default FontColorIcon;
