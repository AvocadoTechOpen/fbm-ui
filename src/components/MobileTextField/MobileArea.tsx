import React, { useEffect, useMemo, useRef } from "react";
import Box from "../Box";
import TextField from "../TextField";
import { DoneIcon } from "../icons";
import { Autocomplete, Popper, createFilterOptions, styled } from "../../mui";

const AutocompleteContainer = styled(Autocomplete)(({ open, size }) => ({
  position: "absolute",
  width: size === "small" ? 80 : 100,
  left: 0,
  top: 0,
  "& .MuiOutlinedInput-notchedOutline": {
    borderLeft: "none",
    borderTop: "none",
    borderBottom: "none",
    borderRadius: 0,
    height: size === "small" ? 39.5 : "auto",
    borderRightColor: open ? "#4caf50" : "rgba(0, 0, 0, 0.08)",
  },
}));

const PopComponent = styled(Popper)(({ theme }) => ({
  width: "240px !important",
  marginLeft: "70px !important",
  marginTop: "4px !important",
  maxHeight: 380,
  overflow: "auto",
  "& .MuiAutocomplete-listbox": {
    "& .MuiListSubheader-root": {
      height: 24,
      paddingLeft: theme.spacing(1),
      fontWight: 400,
      top: 0,
      color: theme.palette.secondary,
      backgroundColor: "#F4F4F4",
    },
    "& .MuiAutocomplete-option": {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontSize: 14,
      backgroundColor: "#fff !important",
      "&:hover": {
        backgroundColor: "#F4F4F4 !important",
      },
    },
  },
}));

const TextFieldContainer = styled(TextField)(
  // @ts-ignore
  ({ open, inputValue, areaValue, size }) => ({
    height: "auto",
    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
      backgroundColor: "transparent",
    },
    "& .MuiAutocomplete-endAdornment>.MuiButtonBase-root>.MuiSvgIcon-root": {
      color: "rgba(0, 0, 0, 0.56)",
    },
    "& .MuiOutlinedInput-root.MuiInputBase-root": {
      paddingTop: size === "small" ? "6px" : "4px",
      paddingBottom: "6px",
      position: "relative",
      "&:before": {
        position: "absolute",
        left: 15,
        content: '""',
        color: "rgba(0, 0, 0, 0.86)",
        ...(open &&
          !inputValue && {
            content: `"${areaValue}"`,
            color: "rgba(0, 0, 0, 0.26)",
            whiteSpace: "nowrap",
          }),
      },
    },
  })
);

export type OptionType = {
  value: any;
  label: string;
  group: string;
  key: string;
};

interface MobileAreaProps {
  area: OptionType | null;
  onOpenChange: (open: boolean) => void;
  onChange: (value: OptionType) => void;
  size?: "small";
  options: OptionType[];
  open: boolean;
  disabled?: boolean;
}

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) =>
    `${(option as OptionType)?.value}${(option as OptionType)?.label}`,
});

const MobileArea = ({
  area,
  onOpenChange,
  onChange,
  size,
  options,
  open,
  disabled,
}: MobileAreaProps) => {
  const mobileRef = useRef(null);
  const handleOpen = () => {
    onOpenChange(true);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleChange = (_event, val) => {
    onChange(val);
  };

  useEffect(() => {
    onOpenChange(open);
  }, [open]);

  const handleFocus = () => {
    mobileRef.current?.firstElementChild?.classList.add("Mui-focused");
  };

  const handleBlur = () => {
    mobileRef.current?.firstElementChild?.classList.remove("Mui-focused");
  };

  useEffect(() => {
    mobileRef.current = document.getElementById("mobile-text");
  }, []);

  useEffect(() => {
    if (!area) {
      const mobileArea = options?.find((n) => n.key === "CN_243");
      onChange?.(mobileArea);
    }
  }, [options]);

  const value = useMemo(() => ({ ...(area || {}) }), [area]);

  return (
    <AutocompleteContainer
      disableClearable
      open={open}
      size={size}
      value={value}
      disabled={disabled}
      PopperComponent={PopComponent}
      options={options}
      filterOptions={filterOptions}
      onFocus={handleFocus}
      onBlur={handleBlur}
      groupBy={(option) => (option as OptionType)?.group}
      getOptionLabel={(option) => `${(option as OptionType)?.value}`}
      // @ts-ignore
      onChange={handleChange}
      isOptionEqualToValue={(o, v) =>
        (v as OptionType)?.key === (o as OptionType)?.key
      }
      openOnFocus
      // inputValue={open ? value : area.value}
      // onInputChange={handleChangeValue}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            {`${(option as OptionType)?.label} ${
              (option as OptionType)?.value
            }`}
          </Box>
          <Box
            component={DoneIcon}
            sx={{ width: 24, height: 24 }}
            style={{
              color: "#4CAF50",
              visibility: selected ? "visible" : "hidden",
            }}
          />
        </li>
      )}
      onOpen={handleOpen}
      onClose={handleClose}
      renderInput={(params) => (
        <TextFieldContainer
          {...params}
          size={size}
          open={open}
          inputValue={params?.inputProps?.value}
          areaValue={value?.value}
        />
      )}
    />
  );
};

export default MobileArea;
