import { styled } from "@mui/material/styles";
import Chip from "../Chip";
import TextField from "../TextField";
import Checkbox from "../Checkbox";
import Box from "../Box";
import { Popper, autocompleteClasses, Autocomplete, inputLabelClasses, outlinedInputClasses } from "@mui/material";

export const CheckBoxItem = styled(Checkbox)(() => ({
  padding: 0,
  width: "20px",
  height: "20px",
  marginRight: "20px",
  "& .PrivateSwitchBase-input": {
    border: "5px solid rgba(0, 0, 0, 0.26)",
  },
}));
export const Root = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
}));

export const ChipBox = styled(Chip)(() => ({
  maxWidth: "360px",
  background: "#fff",
  color: "#4caf50",
  fontSize: "14px",
  "& .MuiChip-label": {
    paddingRight: "6px",
  },
}));

export const SelectChipBox = styled(Chip)(() => ({
  maxWidth: "360px",
  background: "#fff",
  color: "#4caf50",
  fontSize: "14px",
  "& .MuiChip-label": {
    paddingRight: "12px",
  },
}));

export const AutocompleteContainer = styled(Autocomplete)({
  "& .MuiFormControl-root": {
    "& .MuiSvgIcon-root": {
      color: "rgba(0,0,0,.56)",
    },
    "& .MuiAutocomplete-input": {
      padding: "9px 4.5px 9px",
    },
    "& .MuiOutlinedInput-root": {
      paddingTop: 5,
      paddingBottom: 5,
      fontSize: 14,
      overflow: "hidden",
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#4caf50",
          borderWidth: "1px",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#4caf50",
          borderWidth: "1px",
        },
      },
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(0, 0, 0, 0.26)",
        },
      },
    },
  },
});

export const AutocompleteTextField = styled(TextField)(({ theme }) => {
  return {
    [`& .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "rgba(0,0,0,0.08)",
      borderWidth: "1px !important",
    },
    [`& .MuiOutlinedInput-root`]: {
      // padding: '14px 8px 0px !important',
      boxSizing: "border-box !important",
    },
    ["& .MuiInputLabel-root"]: {
      lineHeight: 1,
    },
    [`& .${inputLabelClasses.shrink}`]: {
      transform: "translate(14px, -7px) scale(0.75)",
    },
    [`&:focus .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "red !important",
    },
    [`& .${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: `${theme.palette.primary.main} !important'`,
    },
  };
});

export const PopperComponent = styled(Popper)(({ theme }) => ({
  [`& .${autocompleteClasses.listbox}`]: {
    overflowY: "auto",
    maxHeight: 274,
    [`& .${autocompleteClasses.option}`]: {
      padding: "8px 16px",
      color: theme.palette.text.primary,
      '&[aria-selected="true"]': {
        color: theme.palette.primary.main,
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        "&:focused": {
          backgroundColor: "#fff",
        },
      },
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: "#fff",
      },
    },
  },
}));

export const AutocompleteChip = styled(Chip)({
  maxWidth: "260px",
  fontSize: "14px",
  borderColor: "rgba(0, 0, 0, 0.08)",
  margin: "4px 8px 4px 0 !important",

  "& .MuiButtonBase-root": {
    margin: 0,
    marginBottom: "8px",
  },
  "& .MuiChip-label": {
    lineHeight: "normal",
  },
});
