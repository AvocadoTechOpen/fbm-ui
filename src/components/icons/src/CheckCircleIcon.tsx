import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const CheckCircleIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <g fillRule="evenodd">
      <circle cx="12" cy="12" r="10" />
      <path
        fill="#FFF"
        fillRule="nonzero"
        d="M7.92128122,7.02562097 C8.50542855,7.02562097 8.9874814,7.46273941 9.05818689,8.0277234 L9.06711455,8.1714543 L9.06575,12.180125 L16.5125143,12.1803608 C17.0966616,12.1803608 17.5787145,12.6174793 17.64942,13.1824633 L17.6583476,13.3261941 C17.6583476,13.9103415 17.2212292,14.3923943 16.6562452,14.4630998 L16.5125143,14.4720275 L7.92128122,14.4720275 C7.33713389,14.4720275 6.85508104,14.034909 6.78437556,13.469925 L6.77544789,13.3261941 L6.77544789,8.1714543 C6.77544789,7.53862802 7.28845494,7.02562097 7.92128122,7.02562097 Z"
        transform="rotate(-45 12.217 10.749)"
      />
    </g>
  </SvgIcon>
);

export default CheckCircleIcon;
