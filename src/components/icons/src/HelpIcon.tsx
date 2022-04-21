import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const HelpIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      fillRule="evenodd"
      d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M13,19 L11,19 L11,17 L13,17 L13,19 Z M15.07,11.25 L14.17,12.17 C13.45,12.9 13,13.5 13,15 L11,15 L11,14.5 C11,13.4 11.45,12.4 12.17,11.67 L13.41,10.41 C13.78,10.05 14,9.55 14,9 C14,7.9 13.1,7 12,7 C10.9,7 10,7.9 10,9 L8,9 C8,6.79 9.79,5 12,5 C14.21,5 16,6.79 16,9 C16,9.88 15.64,10.68 15.07,11.25 Z"
    />
  </SvgIcon>
);

export default HelpIcon;
