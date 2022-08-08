import * as React from "react";
import clsx from "clsx";
import {
  Popper,
  ListSubheader,
  Paper,
  IconButton,
  styled,
  Button,
  useThemeProps,
  capitalize,
  autocompleteClasses,
  getAutocompleteUtilityClass,
  alpha,
  useAutocomplete,
  createFilterOptions,
  unstable_composeClasses as composeClasses,
} from "@mui/material";
import { CloseIcon as ClearIcon, ArrowDropDownIcon, DoneIcon } from "../icons";
import { Box } from "../index";

import { AutocompleteChip, CheckBoxItem, Root } from "./index.styles";
import type { AutocompleteProps } from "./interface";
import TreeView from "./components/TreeView";


// TODO
const useUtilityClasses = (ownerState) => {
  const {
    classes,
    disablePortal,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused,
    popupOpen,
    size,
  } = ownerState;

  const slots = {
    root: [
      "root",
      focused && "focused",
      fullWidth && "fullWidth",
      hasClearIcon && "hasClearIcon",
      hasPopupIcon && "hasPopupIcon",
    ],
    inputRoot: ["inputRoot"],
    input: ["input", inputFocused && "inputFocused"],
    tag: ["tag", `tagSize${capitalize(size)}`],
    endAdornment: ["endAdornment"],
    clearIndicator: ["clearIndicator"],
    popupIndicator: ["popupIndicator", popupOpen && "popupIndicatorOpen"],
    popper: ["popper", disablePortal && "popperDisablePortal"],
    paper: ["paper"],
    listbox: ["listbox"],
    loading: ["loading"],
    noOptions: ["noOptions"],
    option: ["option"],
    groupLabel: ["groupLabel"],
    groupUl: ["groupUl"],
  };

  return composeClasses(slots, getAutocompleteUtilityClass, classes);
};

const AutocompleteRoot = styled("div", {
  name: "MuiAutocomplete",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    const { fullWidth, hasClearIcon, hasPopupIcon, inputFocused, size } = ownerState;

    return [
      { [`& .${autocompleteClasses.tag}`]: styles.tag },
      { [`& .${autocompleteClasses.tag}`]: styles[`tagSize${capitalize(size)}`] },
      { [`& .${autocompleteClasses.inputRoot}`]: styles.inputRoot },
      { [`& .${autocompleteClasses.input}`]: styles.input },
      { [`& .${autocompleteClasses.input}`]: inputFocused && styles.inputFocused },
      styles.root,
      fullWidth && styles.fullWidth,
      hasPopupIcon && styles.hasPopupIcon,
      hasClearIcon && styles.hasClearIcon,
    ];
  },
})(({ ownerState }) => ({
  [`&.${autocompleteClasses.focused} .${autocompleteClasses.clearIndicator}`]: {
    visibility: "visible",
  },
  /* Avoid double tap issue on iOS */
  "@media (pointer: fine)": {
    [`&:hover .${autocompleteClasses.clearIndicator}`]: {
      visibility: "visible",
    },
  },
  ...(ownerState.fullWidth && {
    width: "100%",
  }),
  [`& .${autocompleteClasses.tag}`]: {
    margin: 3,
    maxWidth: "calc(100% - 6px)",
    ...(ownerState.size === "small" && {
      margin: 2,
      maxWidth: "calc(100% - 4px)",
    }),
  },
  [`& .${autocompleteClasses.inputRoot}`]: {
    flexWrap: "wrap",
    [`.${autocompleteClasses.hasPopupIcon}&, .${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 26 + 4,
    },
    [`.${autocompleteClasses.hasPopupIcon}.${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 52 + 4,
    },
    [`& .${autocompleteClasses.input}`]: {
      width: 0,
      minWidth: 30,
    },
  },
  "& .MuiInput-root": {
    paddingBottom: 1,
    "& .MuiInput-input": {
      padding: "4px 4px 4px 0px",
    },
  },
  "& .MuiInput-root.MuiInputBase-sizeSmall": {
    "& .MuiInput-input": {
      padding: "2px 4px 3px 0",
    },
  },
  "& .MuiOutlinedInput-root": {
    padding: 9,
    [`.${autocompleteClasses.hasPopupIcon}&, .${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9,
    },
    [`.${autocompleteClasses.hasPopupIcon}.${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9,
    },
    [`& .${autocompleteClasses.input}`]: {
      padding: "7.5px 4px 7.5px 6px",
    },
    [`& .${autocompleteClasses.endAdornment}`]: {
      right: 9,
    },
  },
  "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
    padding: 6,
    [`& .${autocompleteClasses.input}`]: {
      padding: "2.5px 4px 2.5px 6px",
    },
  },
  "& .MuiFilledInput-root": {
    paddingTop: 19,
    paddingLeft: 8,
    [`.${autocompleteClasses.hasPopupIcon}&, .${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9,
    },
    [`.${autocompleteClasses.hasPopupIcon}.${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9,
    },
    "& .MuiFilledInput-input": {
      padding: "7px 4px",
    },
    [`& .${autocompleteClasses.endAdornment}`]: {
      right: 9,
    },
  },
  "& .MuiFilledInput-root.MuiInputBase-sizeSmall": {
    paddingBottom: 1,
    "& .MuiFilledInput-input": {
      padding: "2.5px 4px",
    },
  },
  [`& .${autocompleteClasses.input}`]: {
    flexGrow: 1,
    textOverflow: "ellipsis",
    opacity: 0,
    ...(ownerState.inputFocused && {
      opacity: 1,
    }),
  },
}));

const AutocompleteEndAdornment = styled("div", {
  name: "MuiAutocomplete",
  slot: "EndAdornment",
  overridesResolver: (props, styles) => styles.endAdornment,
})({
  // We use a position absolute to support wrapping tags.
  position: "absolute",
  right: 0,
  top: "calc(50% - 14px)", // Center vertically
});

const AutocompleteClearIndicator = styled(IconButton, {
  name: "MuiAutocomplete",
  slot: "ClearIndicator",
  overridesResolver: (props, styles) => styles.clearIndicator,
})({
  marginRight: -2,
  padding: 4,
  visibility: "hidden",
});

const AutocompletePopupIndicator = styled(IconButton, {
  name: "MuiAutocomplete",
  slot: "PopupIndicator",
  overridesResolver: ({ ownerState }, styles) => ({
    ...styles.popupIndicator,
    ...(ownerState.popupOpen && styles.popupIndicatorOpen),
  }),
})(({ ownerState }) => ({
  padding: 2,
  marginRight: -2,
  ...(ownerState.popupOpen && {
    transform: "rotate(180deg)",
  }),
}));

const AutocompletePopper = styled(Popper, {
  name: "MuiAutocomplete",
  slot: "Popper",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${autocompleteClasses.option}`]: styles.option },
      styles.popper,
      ownerState.disablePortal && styles.popperDisablePortal,
    ];
  },
})(({ theme, ownerState }) => ({
  zIndex: theme.zIndex.modal,
  ...(ownerState.disablePortal && {
    position: "absolute",
  }),
}));

const AutocompletePaper = styled(Paper, {
  name: "MuiAutocomplete",
  slot: "Paper",
  overridesResolver: (props, styles) => styles.paper,
})(({ theme }) => ({
  ...theme.typography.body1,
  overflow: "auto",
}));

const AutocompleteLoading = styled("div", {
  name: "MuiAutocomplete",
  slot: "Loading",
  overridesResolver: (props, styles) => styles.loading,
})(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: "14px 16px",
}));

const AutocompleteNoOptions = styled("div", {
  name: "MuiAutocomplete",
  slot: "NoOptions",
  overridesResolver: (props, styles) => styles.noOptions,
})(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: "14px 16px",
}));

const AutocompleteListbox = styled("div", {
  name: "MuiAutocomplete",
  slot: "Listbox",
  overridesResolver: (props, styles) => styles.listbox,
})(({ theme }) => ({
  listStyle: "none",
  margin: 0,
  padding: "8px 0",
  maxHeight: "40vh",
  overflow: "auto",
  [`& .${autocompleteClasses.option}`]: {
    minHeight: 48,
    display: "flex",
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer",
    paddingTop: 6,
    boxSizing: "border-box",
    outline: "0",
    WebkitTapHighlightColor: "transparent",
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.up("sm")]: {
      minHeight: "auto",
    },
    [`&.${autocompleteClasses.focused}`]: {
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    '&[aria-disabled="true"]': {
      opacity: theme.palette.action.disabledOpacity,
      pointerEvents: "none",
    },
    [`&.${autocompleteClasses.focusVisible}`]: {
      backgroundColor: theme.palette.action.focus,
    },
    '&[aria-selected="true"]': {
      backgroundColor: "#fff",
      [`&.${autocompleteClasses.focused}`]: {
        backgroundColor: "#fff",
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: theme.palette.action.hover,
        },
      },
      [`&.${autocompleteClasses.focusVisible}`]: {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity
        ),
      },
    },
  },
}));

const AutocompleteGroupLabel = styled(ListSubheader, {
  name: "MuiAutocomplete",
  slot: "GroupLabel",
  overridesResolver: (props, styles) => styles.groupLabel,
})(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  top: -8,
}));

const AutocompleteGroupUl = styled("ul", {
  name: "MuiAutocomplete",
  slot: "GroupUl",
  overridesResolver: (props, styles) => styles.groupUl,
})({
  padding: 0,
  [`& .${autocompleteClasses.option}`]: {
    paddingLeft: 24,
  },
});

export { createFilterOptions };

const Autocomplete = React.forwardRef(function Autocomplete(inProps: AutocompleteProps, ref) {
  const props = useThemeProps({ props: inProps, name: "MuiAutocomplete" });

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    ChipProps,
    className,
    clearIcon = <ClearIcon fontSize="small" />,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    clearText = "Clear",
    closeText = "Close",
    componentsProps = {},
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled = false,
    disabledItemsFocusable = false,
    disableListWrap = false,
    disablePortal = false,
    filterOptions,
    filterSelectedOptions = false,
    forcePopupIcon = "auto",
    freeSolo = false,
    fullWidth = false,
    getLimitTagsText = (more) => `+${more}`,
    getOptionDisabled,
    getOptionLabel = (option) => {
      if (type === "tree" && multiple) {
        return <TreeView data={groupedOptions} />;
      }
      if (!multiple) {
        return (
          <Root justifyContent={"space-between"}>
            <Box>{option.label}</Box>
            <DoneIcon
              sx={{
                display: Array.isArray(value) && value.find((v) => v.token === option.token) ? "block" : "none",
                color: "#4caf50",
              }}
            />
          </Root>
        );
      }
      if (multiple) {
        return (
          <Root>
            <CheckBoxItem
              checked={Array.isArray(value) && value.find((v) => v.token === option.token) ? true : false}
            />
            <Box>{option.label}</Box>
          </Root>
        );
      }
    },
    isOptionEqualToValue,
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    limitTags = -1,
    ListboxComponent = "ul",
    ListboxProps,
    loading = false,
    loadingText = "Loading…",
    multiple = false,
    noOptionsText = "No options",
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open,
    openOnFocus = false,
    openText = "Open",
    options,
    PaperComponent = Paper,
    PopperComponent = Popper,
    popupIcon = <ArrowDropDownIcon />,
    renderGroup: renderGroupProp,
    renderInput,
    renderOption: renderOptionProp,
    renderTags,
    selectOnFocus = !props.freeSolo,
    size = "medium",
    value: valueProp,
    type = "radio",
    ...other
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const {
    getRootProps,
    getInputProps,
    getInputLabelProps,
    getPopupIndicatorProps,
    getClearProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    value,
    dirty,
    id,
    popupOpen,
    focused,
    focusedTag,
    anchorEl,
    setAnchorEl,
    inputValue,
    groupedOptions,
  } = useAutocomplete({ ...props, componentName: "Autocomplete" });

  // const setPaperList =

  const hasClearIcon = !disableClearable && !disabled && dirty;
  const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;

  const ownerState = {
    ...props,
    disablePortal,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused: focusedTag === -1,
    popupOpen,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  let startAdornment;

  if (multiple && value.length > 0) {
    const getCustomizedTagProps = (params) => ({
      className: clsx(classes.tag),
      disabled,
      ...getTagProps(params),
    });

    if (renderTags) {
      startAdornment = renderTags(value, getCustomizedTagProps);
    } else {
      startAdornment = value.map((option, index) => (
        <AutocompleteChip
          variant="outlined"
          size="large"
          label={option.label}
          {...getCustomizedTagProps({ index })}
          {...ChipProps}
        />
      ));
    }
  }

  if (limitTags > -1 && Array.isArray(startAdornment)) {
    const more = startAdornment.length - limitTags;
    if (!focused && more > 0) {
      startAdornment = startAdornment.splice(0, limitTags);
      startAdornment.push(
        <span className={classes.tag} key={startAdornment.length}>
          {getLimitTagsText(more)}
        </span>
      );
    }
  }

  const defaultRenderGroup = (params) => (
    <li key={params.key}>
      <AutocompleteGroupLabel className={classes.groupLabel} ownerState={ownerState} component="div">
        {params.group}
      </AutocompleteGroupLabel>
      <AutocompleteGroupUl className={classes.groupUl} ownerState={ownerState}>
        {params.children}
      </AutocompleteGroupUl>
    </li>
  );
  const renderGroup = renderGroupProp || defaultRenderGroup;
  const defaultRenderOption = (props2, option) => <li {...props2}>{getOptionLabel(option)}</li>;
  const renderOption = renderOptionProp || defaultRenderOption;

  const renderListOption = (option, index) => {
    const optionProps = getOptionProps({ option, index });

    return renderOption({ ...optionProps, className: classes.option }, option, {
      selected: optionProps["aria-selected"],
      inputValue,
    });
  };

  return (
    <React.Fragment>
      <AutocompleteRoot
        ref={ref}
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        {...getRootProps(other)}
      >
        {renderInput({
          id,
          disabled,
          fullWidth: true,
          size: size === "small" ? "small" : undefined,
          InputLabelProps: getInputLabelProps(),
          InputProps: {
            ref: setAnchorEl,
            className: classes.inputRoot,
            startAdornment,
            endAdornment: (
              <AutocompleteEndAdornment className={classes.endAdornment} ownerState={ownerState}>
                {hasClearIcon ? (
                  <AutocompleteClearIndicator
                    {...getClearProps()}
                    aria-label={clearText}
                    title={clearText}
                    ownerState={ownerState}
                    {...componentsProps.clearIndicator}
                    className={clsx(classes.clearIndicator, componentsProps.clearIndicator?.className)}
                  >
                    {clearIcon}
                  </AutocompleteClearIndicator>
                ) : null}

                {hasPopupIcon ? (
                  <AutocompletePopupIndicator
                    {...getPopupIndicatorProps()}
                    disabled={disabled}
                    aria-label={popupOpen ? closeText : openText}
                    title={popupOpen ? closeText : openText}
                    className={clsx(classes.popupIndicator)}
                    ownerState={ownerState}
                  >
                    {popupIcon}
                  </AutocompletePopupIndicator>
                ) : null}
              </AutocompleteEndAdornment>
            ),
          },
          inputProps: {
            className: clsx(classes.input),
            disabled,
            ...getInputProps(),
          },
        })}
      </AutocompleteRoot>
      {popupOpen && anchorEl ? (
        <AutocompletePopper
          as={PopperComponent}
          className={clsx(classes.popper)}
          disablePortal={disablePortal}
          style={{
            width: anchorEl ? anchorEl.clientWidth : null,
          }}
          ownerState={ownerState}
          role="presentation"
          anchorEl={anchorEl}
          open
        >
          <AutocompletePaper as={PaperComponent} className={classes.paper} ownerState={ownerState}>
            {loading && groupedOptions.length === 0 ? (
              <AutocompleteLoading className={classes.loading} ownerState={ownerState}>
                {loadingText}
              </AutocompleteLoading>
            ) : null}
            {groupedOptions.length === 0 && !freeSolo && !loading ? (
              <AutocompleteNoOptions
                className={classes.noOptions}
                ownerState={ownerState}
                role="presentation"
                onMouseDown={(event) => {
                  // Prevent input blur when interacting with the "no options" content
                  event.preventDefault();
                }}
              >
                {noOptionsText}
              </AutocompleteNoOptions>
            ) : null}
            {groupedOptions.length > 0 ? (
              // <TreeView data={groupedOptions} />
              <AutocompleteListbox
                as={ListboxComponent}
                className={classes.listbox}
                ownerState={ownerState}
                {...getListboxProps()}
                {...ListboxProps}
              >
                {type === "tree" && multiple ? (
                  <TreeView data={groupedOptions} onChange={onChange} value={value}/>
                ) : (
                  groupedOptions.map((option, index) => {
                    if (groupBy) {
                      return renderGroup({
                        key: option.key,
                        group: option.group,
                        children: option.options.map((option2, index2) =>
                          renderListOption(option2, option.index + index2)
                        ),
                      });
                    }
                    return renderListOption(option, index);
                  })
                )}
              </AutocompleteListbox>
            ) : null}
          </AutocompletePaper>
        </AutocompletePopper>
      ) : null}
    </React.Fragment>
  );
});

export default Autocomplete;
