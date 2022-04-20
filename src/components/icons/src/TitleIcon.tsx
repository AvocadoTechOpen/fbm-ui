import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const TitleIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <polygon
      fillRule="evenodd"
      points="5 4 5 7 10.5 7 10.5 19 13.5 19 13.5 7 19 7 19 4"
    />
  </SvgIcon>
);

export default TitleIcon;
