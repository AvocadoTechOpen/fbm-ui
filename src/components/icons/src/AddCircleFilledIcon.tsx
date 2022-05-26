import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M16,13 L13,13 L13,13 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,13 L11,13 L8,13 C7.44771525,13 7,12.5522847 7,12 C7,11.4477153 7.44771525,11 8,11 L11,11 L11,11 L11,8 C11,7.44771525 11.4477153,7 12,7 C12.5522847,7 13,7.44771525 13,8 L13,11 L13,11 L16,11 C16.5522847,11 17,11.4477153 17,12 C17,12.5522847 16.5522847,13 16,13 Z" />
  </SvgIcon>
);

export default Icon;