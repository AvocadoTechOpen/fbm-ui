import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const ExitIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <g id="Icon-/-exit" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.86">
      <path d="M10.09,15.59 L11.5,17 L16.5,12 L11.5,7 L10.09,8.41 L12.67,11 L3,11 L3,13 L12.67,13 L10.09,15.59 Z M19,3 L5,3 C3.89,3 3,3.9 3,5 L3,9 L5,9 L5,5 L19,5 L19,19 L5,19 L5,15 L3,15 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,5 C21,3.9 20.1,3 19,3 Z" id="Shape" ></path>
    </g>
  </SvgIcon>
);

export default ExitIcon;
