import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const MenuIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M3,18 L21,18 L21,16 L3,16 L3,18 Z M3,13 L21,13 L21,11 L3,11 L3,13 Z M3,6 L3,8 L21,8 L21,6 L3,6 Z" id="Shape" ></path>
  </SvgIcon>
);

export default MenuIcon;
