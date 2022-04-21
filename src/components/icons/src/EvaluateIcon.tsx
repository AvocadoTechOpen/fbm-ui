import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const EvaluateIcon: React.FC<SvgIconProps>= (props) => (
  <SvgIcon {...props}>
    <path 
      fillRule="evenodd" 
      d="M16,3 L21,8 L21,19 C21,20.1 20.1,21 19,21 L19,21 L5,21 C3.9,21 3,20.1 3,19 L3,19 L3,5 C3,3.9 3.9,3 5,3 L5,3 L16,3 Z M17,15 L7,15 L7,17 L17,17 L17,15 Z M17,11 L7,11 L7,13 L17,13 L17,11 Z M15,5 L15,9 L19,9 L15,5 Z M12,7 L7,7 L7,9 L12,9 L12,7 Z" 
    />
  </SvgIcon>
);

export default EvaluateIcon;