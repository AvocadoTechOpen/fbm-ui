import React from 'react';
import { FormControlLabel, FormControlLabelProps, Checkbox as MuiCheckbox, createChainedFunction } from '@mui/material';
import useCheckboxGroup from '../CheckboxGroup/useCheckboxGroup'

export interface CheckboxProps extends FormControlLabelProps { }

function areEqualValues(values, name): boolean {
  return values?.includes(name)
}

const Checkbox: React.FC<CheckboxProps> = React.forwardRef((props, ref) => {
  const {
    label,
    value,
    name: nameProp,
    checked: checkedProp,
    onChange: onChangeProp,
  } = props

  const checkboxGroup = useCheckboxGroup();

  let checked = checkedProp;
  const onChange = createChainedFunction(onChangeProp, checkboxGroup && checkboxGroup.onChange);
  let name = nameProp;

  if (checkboxGroup) {
    if (typeof nameProp === 'undefined') {
      name = checkboxGroup.name;
    }
    if (typeof checked === 'undefined') {
      checked = areEqualValues(checkboxGroup.value, value);
    }
  }

  return (
    <FormControlLabel
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      checked={checked}
      control={<MuiCheckbox />}
    />
  )
})

export default Checkbox;
