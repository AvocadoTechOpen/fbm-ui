import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path fill-opacity=".86" fill-rule="evenodd" d="M19,2 C19.5522847,2 20,2.44771525 20,3 C20,3.55228475 19.5522847,4 19,4 L14.337,4 L11.516,20 L16,20 C16.5522847,20 17,20.4477153 17,21 C17,21.5522847 16.5522847,22 16,22 L5,22 C4.44771525,22 4,21.5522847 4,21 C4,20.4477153 4.44771525,20 5,20 L9.485,20 L12.307,4 L8,4 C7.44771525,4 7,3.55228475 7,3 C7,2.44771525 7.44771525,2 8,2 L19,2 Z" />
  </SvgIcon>
);

export default Icon;