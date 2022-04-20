import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const CarouselIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      fillRule="evenodd"
      d="M2,7 L6,7 L6,17 L2,17 L2,7 Z M7,19 L17,19 L17,5 L7,5 L7,19 Z M18,7 L22,7 L22,17 L18,17 L18,7 Z"
    />
  </SvgIcon>
);

export default CarouselIcon;
