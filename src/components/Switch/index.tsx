import React from 'react';
import {
  FormControlLabel,
  FormControlLabelProps,
  formControlLabelClasses,
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
  switchClasses,
  styled
} from '@mui/material'

export interface SwitchProps extends MuiSwitchProps {
  label?: FormControlLabelProps['label'];
}

const CustomSwitch = styled(MuiSwitch)(({ theme, size }) => {
  return {
    ...(size === 'small' && {
      width: 30,
      height: 16,
    }),
    ...(size === 'medium' && {
      width: 36,
      height: 22,
    }),
    padding: 0,
    [`& .${switchClasses.switchBase}`]: {
      padding: 0,
      margin: 1,
      transitionDuration: '300ms',
      [`&.${switchClasses.checked}`]: {
        transform: 'translateX(13px)',
        color: '#fff',
        [`& + .${switchClasses.track}`]: {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      ...(size === 'small' && {
        width: 14,
        height: 14,
      }),
      ...(size === 'medium' && {
        width: 20,
        height: 20,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }
})

const ControlLabel = styled(FormControlLabel)({
  margin: 0,
  [`& .${formControlLabelClasses.label}`]: {
    fontSize: 14,
    marginLeft: 8,
  }
})

const Switch: React.FC<SwitchProps> = React.forwardRef((props, ref) => {
  const { children, label, sx, ...SwitchProps } = props
  return (
    <ControlLabel
      sx={sx}
      control={<CustomSwitch {...SwitchProps} />}
      label={label}
    />
  )
})

Switch.defaultProps = {
  size: 'medium',
}

export default Switch