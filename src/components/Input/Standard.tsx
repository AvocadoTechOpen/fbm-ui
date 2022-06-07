import React from 'react';
import styled from '@mui/material/styles/styled'
import {
  Input,
  InputProps,
  inputClasses,
} from '@mui/material'

export { InputProps as StandardInputProps } from '@mui/material'

const StandardInput: React.FC<InputProps> = styled(Input)(({ theme, color }) => {
  return {
    backgroundColor: '#FFF',
    [`&:hover:not(.${inputClasses.disabled}):before`]: {
      borderBottom: `1px solid rgba(0,0,0,0.26)`,
    },
    '&:after': {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    '&:before': {
      borderBottom: `1px solid rgba(0,0,0,0.08)`,
    },
  }
})



export default StandardInput

