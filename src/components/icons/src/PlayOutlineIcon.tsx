import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M12,4 C7.584,4 4,7.584 4,12 C4,16.416 7.584,20 12,20 C16.416,20 20,16.416 20,12 C20,7.584 16.416,4 12,4 Z M10,16.5 L10,7.5 L16,12 L10,16.5 Z" />
  </SvgIcon>
);

export default Icon;