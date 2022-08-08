import React from 'react';
import AutocompleteCore from './Autocomplete'
import { useThemeProps } from '@mui/material'
import Input from '../Input'

const Autocomplete = (inProps) => {
  const props = useThemeProps({ props: inProps, name: 'MuiAutocomplete' });
  const {
    label,
    placeholder,
  } = props
  
  return (
    <AutocompleteCore
      renderInput={(params) => {
        return (
          <Input
            label={label}
            placeholder={placeholder}
            {...params}
          />
        )
      }}
      {...props}
    />
  )
}

export default Autocomplete