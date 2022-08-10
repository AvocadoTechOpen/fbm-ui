import React from "react";
import styled from "@mui/material/styles/styled";
import { Chip, ChipProps, chipClasses } from "@mui/material";
import { alpha } from "@mui/system";

type SizeMap = "small" | "medium" | "large";

const ChipRoot: React.FC<ChipProps> = styled(Chip)(({ size, theme, variant, color }) => {
  return {
    [`& .${chipClasses.label}`]: {
      paddingLeft: 11,
      paddingRight: 13,
      fontSize: 14,
    },
    "&:hover": {
      cursor: "pointer",
      ...(variant === "outlined"
        ? {
            backgroundColor: theme.palette.action.hover,
          }
        : {
            backgroundColor: theme.palette[color] && theme.palette[color]?.main,
          }),
    },
    ...(size === "small" && {
      height: "18px",
      [`& .${chipClasses.labelSmall}`]: {
        paddingLeft: 7,
        paddingRight: 7,
        fontSize: 12,
      },
    }),
    ...(size === "medium" && {
      height: "24px",
      [`& .${chipClasses.labelMedium}`]: {
        paddingLeft: 7,
        paddingRight: 7,
        fontSize: 12,
      },
      [`& .${chipClasses.deleteIconMedium}`]: {
        fontSize: 14,
      },
    }),
    ...((size as SizeMap) === "large" && {
      height: "32px",
      [`& .${chipClasses.labelMedium}`]: {
        fontSize: 14,
      },
      [`& .${chipClasses.deleteIcon}`]: {
        fontSize: 18,
      },
    }),
  };
});

ChipRoot.defaultProps = {
  variant: "outlined",
  size: "medium",
};

export default ChipRoot;
