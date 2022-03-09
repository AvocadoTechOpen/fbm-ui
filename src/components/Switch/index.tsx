import React from 'react';
import {
  FormControlLabel,
  FormControlLabelProps,
  Switch,
  SwitchProps,
  switchClasses,
  styled
} from '@mui/material'

interface FbmSwitchProps extends SwitchProps {
  label?: FormControlLabelProps['label'];
}

const CustomSwitch = styled(Switch)(({ theme }) => {
  return {
    width: 42,
    height: 26,
    padding: 0,
    [`& .${switchClasses.switchBase}`]: {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      [`&.${switchClasses.checked}`]: {
        transform: 'translateX(16px)',
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
      width: 22,
      height: 22,
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

const FbmSwitch: React.FC<FbmSwitchProps> = React.forwardRef((props, ref) => {
  const { children, label, ...SwitchProps } = props

  return (
    <FormControlLabel control={<CustomSwitch {...SwitchProps} />} label={label} />
  )
})

FbmSwitch.defaultProps = {
  size: 'medium',
}

export default FbmSwitch