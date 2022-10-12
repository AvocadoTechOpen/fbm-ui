import { Popper, styled, Paper } from '@mui/material'


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


export const TreeSelectPaper = styled(Paper, {
  name: 'MuiAutocomplete',
  slot: 'Paper',
  overridesResolver: (props, styles) => styles.paper,
})(({ theme }) => ({
  ...theme.typography.body1,
  overflow: 'auto',
  padding: '4px 0',
}));