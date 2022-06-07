import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const RichTextIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      fillRule="evenodd"
      d="M2.5,4 L2.5,7 L7.5,7 L7.5,19 L10.5,19 L10.5,7 L15.5,7 L15.5,4 L2.5,4 Z M21.5,9 L12.5,9 L12.5,12 L15.5,12 L15.5,19 L18.5,19 L18.5,12 L21.5,12 L21.5,9 Z"
    />
  </SvgIcon>
);

export default RichTextIcon;
