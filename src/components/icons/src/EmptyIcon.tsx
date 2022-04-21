import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const EmptyIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      fillRule="evenodd"
      d="M12,4 C16.42,4 20,7.58 20,12 C20,16.42 16.42,20 12,20 C7.58,20 4,16.42 4,12 C4,7.58 7.58,4 12,4 Z M16.3997755,11.3714606 L7.60022447,11.3714606 C7.25309177,11.3714606 6.97168511,11.6528673 6.97168511,12 C6.97168511,12.3471327 7.25309177,12.6285394 7.60022447,12.6285394 L16.3997755,12.6285394 C16.7469082,12.6285394 17.0283149,12.3471327 17.0283149,12 C17.0283149,11.6528673 16.7469082,11.3714606 16.3997755,11.3714606 Z"
    />
  </SvgIcon>
);

export default EmptyIcon;
