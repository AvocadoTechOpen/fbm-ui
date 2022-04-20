import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const RichEditorDropdownIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <polygon
      fill="#5C6165"
      fillRule="nonzero"
      transform="translate(3.500000, 11.500000) rotate(-45.000000) translate(-3.500000, -11.500000) "
      points="2 9 2 13 6 13 6 14 1 14 1 9"
    ></polygon>
  </SvgIcon>
);

export default RichEditorDropdownIcon;
