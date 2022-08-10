import React from 'react';
import AutocompleteCore from './Autocomplete'
import { useThemeProps } from '@mui/material'
import Input from '../Input'

const Autocomplete = (inProps) => {
  const props = useThemeProps({ props: inProps, name: 'MuiAutocomplete' });
  
  return (
    <AutocompleteCore
      renderInput={(props) => <Input {...props} />}
      {...props}
    />
  )
}

export default Autocomplete