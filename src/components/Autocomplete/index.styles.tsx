import autocompleteClasses, { getAutocompleteUtilityClass } from './autocompleteClasses';
import { capitalize, styled, Popper, ListSubheader, Paper, IconButton, chipClasses, inputClasses, inputBaseClasses, outlinedInputClasses, filledInputClasses } from '@mui/material'
import {
  unstable_composeClasses as composeClasses,
} from '@mui/base';

export const useUtilityClasses = (ownerState) => {
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
      'root',
      focused && 'focused',
      fullWidth && 'fullWidth',
      hasClearIcon && 'hasClearIcon',
      hasPopupIcon && 'hasPopupIcon',
    ],
    inputRoot: ['inputRoot'],
    input: ['input', inputFocused && 'inputFocused'],
    tag: ['tag', `tagSize${capitalize(size)}`],
    endAdornment: ['endAdornment'],
    clearIndicator: ['clearIndicator'],
    popupIndicator: ['popupIndicator', popupOpen && 'popupIndicatorOpen'],
    popper: ['popper', disablePortal && 'popperDisablePortal'],
    paper: ['paper'],
    listbox: ['listbox'],
    loading: ['loading'],
    noOptions: ['noOptions'],
    option: ['option'],
    optionLabel: ['optionLabel'],
    optioncheckedIcon: ['optioncheckedIcon'],
    typography: ['typography'],
    checkedIcon: ['checkedIcon'],
    groupLabel: ['groupLabel'],
    groupUl: ['groupUl'],
  };

  return composeClasses(slots, getAutocompleteUtilityClass, classes);
};


export const AutocompletePopper = styled(Popper, {
  name: 'MuiAutocomplete',
  slot: 'Popper',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${autocompleteClasses.option}`]: styles.option },
      styles.popper,
      ownerState?.disablePortal && styles.popperDisablePortal,
    ];
  },
})(({ theme }) => ({
  zIndex: theme.zIndex.modal,
}));

export const AutocompletePaper = styled(Paper, {
  name: 'MuiAutocomplete',
  slot: 'Paper',
  overridesResolver: (props, styles) => styles.paper,
})(({ theme }) => ({
  ...theme.typography.body1,
  overflow: 'auto',
}));

export const AutocompleteLoading = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Loading',
  overridesResolver: (props, styles) => styles.loading,
})(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: '14px 16px',
}));

export const AutocompleteNoOptions = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'NoOptions',
  overridesResolver: (props, styles) => styles.noOptions,
})(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: '14px 16px',
}));


export const AutocompleteListbox = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox,
})(({ theme }) => {
  return ({
    listStyle: 'none',
    margin: 0,
    padding: '8px 0',
    maxHeight: '40vh',
    overflow: 'auto',
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 48,
      display: 'flex',
      overflow: 'hidden',
      justifyContent: 'flex-start',
      alignItems: 'center',
      cursor: 'pointer',
      paddingTop: 6,
      boxSizing: 'border-box',
      outline: '0',
      WebkitTapHighlightColor: 'transparent',
      paddingBottom: 6,
      paddingLeft: 16,
      paddingRight: 16,
      [theme.breakpoints.up('sm')]: {
        minHeight: 'auto',
      },
      [`&.${autocompleteClasses.focused}`]: {
        backgroundColor: theme.palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '&[aria-disabled="true"]': {
        opacity: theme.palette.action.disabledOpacity,
        pointerEvents: 'none',
      },
      // [`&.${autocompleteClasses.focusVisible}`]: {
      //   backgroundColor: theme.palette.action.focus,
      // },
      [`& .${autocompleteClasses.optionLabel}`]: {
        flex: 1,
        wordBreak:'break-all', 
      },
      [`& .${autocompleteClasses.optioncheckedIcon}`]: {
        color: theme.palette.primary.main
      },
      '&[aria-selected="true"]': {
        [`&.${autocompleteClasses.focused}`]: {
          '@media (hover: none)': {
            backgroundColor: theme.palette.action.selected,
          },
        },
      },
      '&[aria-multiple="true"]': {
        paddingLeft: 4
      },
    },
  })
});

export const AutocompleteGroupLabel = styled(ListSubheader, {
  name: 'MuiAutocomplete',
  slot: 'GroupLabel',
  overridesResolver: (props, styles) => styles.groupLabel,
})(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  top: -8,
}));

export const AutocompleteGroupUl = styled('ul', {
  name: 'MuiAutocomplete',
  slot: 'GroupUl',
  overridesResolver: (props, styles) => styles.groupUl,
})({
  padding: 0,
  [`& .${autocompleteClasses.option}`]: {
    paddingLeft: 24,
  },
});

export const inputRoot = {
  flexWrap: 'wrap',
  alignItems: 'start',
  [`& .${autocompleteClasses.input}`]: {
    width: 0,
    minWidth: 30,
    flexGrow: 1,
    textOverflow: 'ellipsis'
  },
  [`& .${chipClasses.root}`]: {
    margin: '8px 0 0 4px'
  },
  [`& .${chipClasses.sizeMedium}`]: {
    margin: '6px 0 0 4px'
  },
  [`&:hover .${autocompleteClasses.clearIndicator}`]: {
    visibility: 'visible',
  },
}

export const AutocompleteEndAdornment = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'EndAdornment',
  overridesResolver: (props, styles) => styles.endAdornment,
})({
  // We use a position absolute to support wrapping tags.
  position: 'absolute',
  right: 0,
  top: 'calc(50% - 14px)', // Center vertically
});

export const AutocompleteClearIndicator = styled(IconButton, {
  name: 'MuiAutocomplete',
  slot: 'ClearIndicator',
  overridesResolver: (props, styles) => styles.clearIndicator,
})({
  marginRight: -2,
  padding: 4,
  visibility: 'hidden',
});

export const AutocompletePopupIndicator = styled(IconButton, {
  name: 'MuiAutocomplete',
  slot: 'PopupIndicator',
  overridesResolver: ({ ownerState }, styles) => ({
    ...styles.popupIndicator,
    ...(ownerState.popupOpen && styles.popupIndicatorOpen),
  }),
})(({ ownerState }) => ({
  padding: 2,
  marginRight: -2,
  ...(ownerState.popupOpen && {
    transform: 'rotate(180deg)',
  }),
}));