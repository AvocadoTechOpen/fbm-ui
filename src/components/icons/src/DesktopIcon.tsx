import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const DesktopIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <g id="Icon-/-desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.86">
      <path d="M20,2 L4,2 C2.9,2 2,2.9 2,4 L2,16 C2,17.1 2.9,18 4,18 L10,18 L8,21 L8,22 L16,22 L16,21 L14,18 L20,18 C21.1,18 22,17.1 22,16 L22,4 C22,2.9 21.1,2 20,2 Z M20,14 L4,14 L4,4 L20,4 L20,14 Z" id="Shape" fill="currentColor"></path>
    </g>
  </SvgIcon>
);

export default DesktopIcon;
