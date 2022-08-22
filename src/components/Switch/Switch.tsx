import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { alpha, darken, lighten } from '@mui/system';
import capitalize from '../utils/capitalize';
import SwitchBase from '../internal/SwitchBase';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, edge, size, color, checked, disabled } = ownerState;

  const slots = {
    root: ['root', edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`],
    switchBase: [
      'switchBase',
      `color${capitalize(color)}`,
      checked && 'checked',
      disabled && 'disabled',
    ],
    thumb: ['thumb'],
    track: ['track'],
    input: ['input'],
  };

  const composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);

  return {
    ...classes, // forward the disabled and checked classes to the SwitchBase
    ...composedClasses,
  };
};

const SwitchRoot = styled('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`],
      styles[`size${capitalize(ownerState.size)}`],
    ];
  },
})(({ ownerState }) => ({
  display: 'inline-flex',
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: 'hidden',
  padding: 12,
  boxSizing: 'border-box',
  position: 'relative',
  flexShrink: 0,
  zIndex: 0, // Reset the stacking context.
  verticalAlign: 'middle', // For correct alignment with the text.
  '@media print': {
    colorAdjust: 'exact',
  },
  ...(ownerState.edge === 'start' && {
    marginLeft: -8,
  }),
  ...(ownerState.edge === 'end' && {
    marginRight: -8,
  }),
  ...(ownerState.size === 'small' && {
    width: 40,
    height: 24,
    padding: 7,
    [`& .${switchClasses.thumb}`]: {
      width: 16,
      height: 16,
    },
    [`& .${switchClasses.switchBase}`]: {
      padding: 4,
      [`&.${switchClasses.checked}`]: {
        transform: 'translateX(16px)',
      },
    },
  }),
}));

const SwitchSwitchBase = styled(SwitchBase, {
  name: 'MuiSwitch',
  slot: 'SwitchBase',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.switchBase,
      { [`& .${switchClasses.input}`]: styles.input },
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(
  ({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1, // Render above the focus ripple.
    color: theme.vars
      ? theme.vars.palette.Switch.defaultColor
      : `${theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300]}`,
    transition: theme.transitions.create(['left', 'transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    [`&.${switchClasses.checked}`]: {
      transform: 'translateX(20px)',
    },
    [`&.${switchClasses.disabled}`]: {
      color: theme.vars
        ? theme.vars.palette.Switch.defaultDisabledColor
        : `${theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]}`,
    },
    [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
      opacity: 0.5,
    },
    [`&.${switchClasses.disabled} + .${switchClasses.track}`]: {
      opacity: theme.vars
        ? theme.vars.opacity.switchTrackDisabled
        : `${theme.palette.mode === 'light' ? 0.12 : 0.2}`,
    },
    [`& .${switchClasses.input}`]: {
      left: '-100%',
      width: '300%',
    },
  }),
  ({ theme, ownerState }) => ({
    '&:hover': {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
        : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    ...(ownerState.color !== 'default' && {
      [`&.${switchClasses.checked}`]: {
        color: (theme.vars || theme).palette[ownerState.color].main,
        '&:hover': {
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${
                theme.vars.palette.action.hoverOpacity
              })`
            : alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
        [`&.${switchClasses.disabled}`]: {
          color: theme.vars
            ? theme.vars.palette.Switch[`${ownerState.color}DisabledColor`]
            : `${
                theme.palette.mode === 'light'
                  ? lighten(theme.palette[ownerState.color].main, 0.62)
                  : darken(theme.palette[ownerState.color].main, 0.55)
              }`,
        },
      },
      [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
        backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
      },
    }),
  }),
);

const SwitchTrack = styled('span', {
  name: 'MuiSwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})(({ theme }) => ({
  height: '100%',
  width: '100%',
  borderRadius: 14 / 2,
  zIndex: -1,
  transition: theme.transitions.create(['opacity', 'background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  backgroundColor: theme.vars
    ? theme.vars.palette.common.onBackground
    : `${theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white}`,
  opacity: theme.vars
    ? theme.vars.opacity.switchTrack
    : `${theme.palette.mode === 'light' ? 0.38 : 0.3}`,
}));

const SwitchThumb = styled('span', {
  name: 'MuiSwitch',
  slot: 'Thumb',
  overridesResolver: (props, styles) => styles.thumb,
})(({ theme }) => ({
  boxShadow: (theme.vars || theme).shadows[1],
  backgroundColor: 'currentColor',
  width: 20,
  height: 20,
  borderRadius: '50%',
}));

const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiSwitch' });
  const { className, color = 'primary', edge = false, size = 'medium', sx, ...other } = props;

  const ownerState = {
    ...props,
    color,
    edge,
    size,
  };

  const classes = useUtilityClasses(ownerState);
  const icon = <SwitchThumb className={classes.thumb} ownerState={ownerState} />;

  return (
    <SwitchRoot className={clsx(classes.root, className)} sx={sx} ownerState={ownerState}>
      <SwitchSwitchBase
        type="checkbox"
        icon={icon}
        checkedIcon={icon}
        ref={ref}
        ownerState={ownerState}
        {...other}
        classes={{
          ...classes,
          root: classes.switchBase,
        }}
      />
      <SwitchTrack className={classes.track} ownerState={ownerState} />
    </SwitchRoot>
  );
});


export default Switch;
