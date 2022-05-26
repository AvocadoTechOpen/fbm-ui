import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M12,6 C15.79,6 19.17,8.13 20.82,11.5 C19.17,14.87 15.79,17 12,17 C8.21,17 4.83,14.87 3.18,11.5 C4.83,8.13 8.21,6 12,6 M12,4 C7,4 2.73,7.11 1,11.5 C2.73,15.89 7,19 12,19 C17,19 21.27,15.89 23,11.5 C21.27,7.11 17,4 12,4 Z M12,9 C13.38,9 14.5,10.12 14.5,11.5 C14.5,12.88 13.38,14 12,14 C10.62,14 9.5,12.88 9.5,11.5 C9.5,10.12 10.62,9 12,9 M12,7 C9.52,7 7.5,9.02 7.5,11.5 C7.5,13.98 9.52,16 12,16 C14.48,16 16.5,13.98 16.5,11.5 C16.5,9.02 14.48,7 12,7 Z" />
  </SvgIcon>
);

export default Icon;