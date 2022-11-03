import { Popper, styled, Paper, inputBaseClasses, chipClasses } from '@mui/material'
import { IconButton, Input } from '..'
import treeSelecClasses from './treeSelectClasses'


export const TreeSelectPopper = styled(Popper, {
  name: 'MuiAutocomplete',
  slot: 'Popper',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.popper,
    ];
  },
})(({ theme }) => ({
  zIndex: theme.zIndex.modal,
  padding: 0,
}));

export const TreeSelectInput = styled(Input, {
  name: 'MuiAutocomplete',
  slot: 'InputRoot',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.inputRoot,
    ];
  },
})({
  flexWrap: 'wrap',
  alignItems: 'start',
  paddingLeft: 0,
  paddingRight: '62px',
  [`& .${treeSelecClasses.input}`]: {
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
  [`&:hover .${treeSelecClasses.clearIndicator}`]: {
    visibility: 'visible',
  },
  [`&.${inputBaseClasses.sizeSmall} .${treeSelecClasses.endAdornment}`]: {
    top: '6.5px', // Center vertically
  },

  // // limitTag css
  // [`& .${autocompleteClasses.limitTag}`]: {
  //   height: '32px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   marginTop: '8px',
  //   marginLeft: '3px',
  // },
  // [`&.${inputBaseClasses.sizeSmall} .${autocompleteClasses.limitTag}`]: {
  //   height: '24px',
  //   marginTop: '6.5px',
  // },
})


export const TreeSelectPaper = styled(Paper, {
  name: 'MuiAutocomplete',
  slot: 'Paper',
  overridesResolver: (props, styles) => styles.paper,
})(({ theme }) => ({
  ...theme.typography.body1,
  overflow: 'auto',
  padding: '4px 0',
}));


export const TreeSelectTreeBox = styled('div', {
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
  })
});

export const TreeSelectEndAdornment = styled('div', {
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

export const TreeSelectClearIndicator = styled(IconButton, {
  name: 'MuiAutocomplete',
  slot: 'ClearIndicator',
  overridesResolver: (props, styles) => styles.clearIndicator,
})({
  marginRight: 7,
  padding: 0,
  color: 'rgba(0, 0, 0, 0.56)',
  visibility: 'hidden',
});

export const TreeSelectPopupIndicator = styled(IconButton, {
  name: 'MuiAutocomplete',
  slot: 'PopupIndicator',
  overridesResolver: ({ ownerState }, styles) => ({
    // @ts-ignore
    ...styles.popupIndicator,
       // @ts-ignore
    ...(ownerState.popupOpen && styles.popupIndicatorOpen),
  }),
     // @ts-ignore
})(({ ownerState }) => ({
  padding: 0,
  marginRight: 7,
  color: 'rgba(0, 0, 0, 0.56)',
  ...(ownerState.popupOpen && {
    transform: 'rotate(180deg)',
  }),
}));
