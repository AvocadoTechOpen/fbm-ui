import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const RichEditorEmailIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      d="M12.25 0a1 1 0 011 1v8a1 1 0 01-1 1H1.75a1 1 0 01-1-1V1a1 1 0 011-1h10.5zm0 1.606l-5 2.89a.5.5 0 01-.42.038l-.08-.037-5-2.874V9h10.5V1.606zM11.3 1H2.673l4.326 2.485L11.3 1z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </SvgIcon>
);

export default RichEditorEmailIcon;
