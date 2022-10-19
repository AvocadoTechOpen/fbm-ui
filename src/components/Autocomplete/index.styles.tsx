import autocompleteClasses, { getAutocompleteUtilityClass } from './autocompleteClasses';
import {
  capitalize,
  styled,
  Popper,
  ListSubheader,
  Paper,
  IconButton,
  chipClasses,
  inputBaseClasses,
} from '@mui/material'
import { unstable_composeClasses as composeClasses, } from '@mui/base';

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
    limitTag: ['limitTag', `limitTag${capitalize(size)}`],
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
    ];
  },
})(({ theme }) => ({
  zIndex: theme.zIndex.modal,
  padding: 0,
}));

export const AutocompletePaper = styled(Paper, {
  name: 'MuiAutocomplete',
  slot: 'Paper',
  overridesResolver: (props, styles) => styles.paper,
})(({ theme }) => ({
  ...theme.typography.body1,
  overflow: 'auto',
  padding: '4px 0',
}));

export const AutocompleteLoading = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Loading',
  overridesResolver: (props, styles) => styles.loading,
})(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: '10px',
}));

export const AutocompleteNoOptions = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'NoOptions',
  overridesResolver: (props, styles) => styles.noOptions,
})(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: '10px',
}));

export const AutocompleteListbox = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox,
})(({ theme }) => {
  return ({
    listStyle: 'none',
    margin: 0,
    padding: 0,
    maxHeight: '40vh',
    overflow: 'auto',
    [`& .${autocompleteClasses.option}`]: {
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
  paddingLeft: 0,
  paddingRight: '62px',
  [`& .${autocompleteClasses.input}`]: {
    width: 0,
    minWidth: '30px',
    flexGrow: 1,
    textOverflow: 'ellipsis',
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
  [`&.${inputBaseClasses.sizeSmall} .${autocompleteClasses.endAdornment}`]: {
    top: '6.5px', // Center vertically
  },

  // limitTag css
  [`& .${autocompleteClasses.limitTag}`]: {
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '8px',
    marginLeft: '3px',
  },
  [`&.${inputBaseClasses.sizeSmall} .${autocompleteClasses.limitTag}`]: {
    height: '24px',
    marginTop: '6.5px',
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
  // 默认input框 48
  top: '11.5px',
});

export const AutocompleteClearIndicator = styled(IconButton, {
  name: 'MuiAutocomplete',
  slot: 'ClearIndicator',
  overridesResolver: (props, styles) => styles.clearIndicator,
})({
  marginRight: 7,
  padding: 0,
  color: 'rgba(0, 0, 0, 0.56)',
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
  padding: 0,
  marginRight: 7,
  color: 'rgba(0, 0, 0, 0.56)',
  ...(ownerState.popupOpen && {
    transform: 'rotate(180deg)',
  }),
}));


