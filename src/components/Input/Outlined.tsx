import React from 'react'
import styled from '@mui/material/styles/styled'
import {
  OutlinedInput as MuiOutlinedInput,
  OutlinedInputProps as MuiOutlinedInputProps,
  outlinedInputClasses,
} from '@mui/material'

export type OutlinedInputProps = MuiOutlinedInputProps;

const OutlinedInput: React.FC<OutlinedInputProps> = styled(MuiOutlinedInput)(({ theme, startAdornment, endAdornment,  size }) => {
  return {
    backgroundColor: '#fff',
    padding: 0,
    [`.${outlinedInputClasses.notchedOutline}`]: {
      borderColor: 'rgba(0,0,0,0.08)',
    },
    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: 'rgba(0,0,0,0.26)',
    },
    [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
    [`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: theme.palette.error.main,
    },
    [`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: 'rgba(0, 0, 0, 0.08)',
      backgroundColor: theme.palette.action.disabledBackground
    },
    ...(startAdornment && {
      paddingLeft: 12,
      [`& .${outlinedInputClasses.input}`]: {
        paddingLeft: 0,
      },
    }),
    ...(endAdornment && {
      paddingRight: 12,
      [`& .${outlinedInputClasses.input}`]: {
        paddingRight: 0,
      },
    }),
    [`& .${outlinedInputClasses.input}`]: {
      padding: '12.5px 12px',
    },
    ...(size === 'small' && {
      [`& .${outlinedInputClasses.input}`]: {
        padding: '8px 12px 8px 12px',
        fontSize: 14,
      },
    }),
  }
})

export default OutlinedInput
