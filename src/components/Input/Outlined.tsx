import React from 'react'
import styled from '@mui/material/styles/styled'
import {
  OutlinedInput as MuiOutlinedInput,
  OutlinedInputProps,
  outlinedInputClasses,
} from '@mui/material'

export { OutlinedInputProps } from '@mui/material'

const OutlinedInput: React.FC<OutlinedInputProps> = styled(MuiOutlinedInput)(({ theme, startAdornment, size }) => (
  {
    backgroundColor: '#FFF',
    [`.${outlinedInputClasses.notchedOutline}`]: {
      borderColor: 'rgba(0,0,0,0.08)',
    },
    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: 'rgba(0,0,0,0.26)',
    },
    [`& .${outlinedInputClasses.input}`]: {
      padding: '12px 12px 13px 12px'
    },
    ...(size === 'small' && {
      [`& .${outlinedInputClasses.input}`]: {
        padding: '6px 12px 7px 12px',
        fontSize: 14,
      },
    }),
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
      paddingLeft: 4,
      [`& .${outlinedInputClasses.input}`]: {
        padding: '10px 12px 11px 4px'
      },
    }),
  }
))

export default OutlinedInput
