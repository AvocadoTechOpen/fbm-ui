import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const RichEditorUnderlineIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      d="M16,17 L16,18 L8,18 L8,17 L16,17 Z M16,7 L16.0002681,12 C16.0002681,14.209139 14.2094071,16 12.0002681,16 C9.79112908,16 8.00026808,14.209139 8.00026808,12 L8,7 L16,7 Z M15.0002681,7 L9.00026808,7 L9.00026808,12 C9.00026808,13.5976809 10.249188,14.9036609 11.8239953,14.9949073 L12.0002681,15 C13.597949,15 14.903929,13.75108 14.9951754,12.1762728 L15.0002681,12 L15.0002681,7 Z"
      fill="#5C6165"
      fillRule="nonzero"
    ></path>
  </SvgIcon>
);

export default RichEditorUnderlineIcon;
