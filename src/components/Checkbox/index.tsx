import React from 'react';
import { FormControlLabel, FormControlLabelProps, Checkbox as MuiCheckbox, createChainedFunction } from '@mui/material';
import useCheckboxGroup from '../CheckboxGroup/useCheckboxGroup'

export interface CheckboxProps extends FormControlLabelProps { }

function areEqualValues(values, name): boolean {
  return values?.includes?.(name)
}

const Checkbox: React.FC<CheckboxProps> = React.forwardRef((props, ref) => {
  const {
    label,
    value,
    disabled,
    name: nameProp,
    checked: checkedProp,
    onChange: onChangeProp,
    ...otherProps
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
  
  // 兼容formItem
  if(typeof checked === 'undefined' && typeof value === 'boolean') {
    checked = value
  }

  return (
    <FormControlLabel
      ref={ref}
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      checked={checked}
      disabled={disabled}
      control={<MuiCheckbox />}
      {...otherProps}
    />
  )
})

export default Checkbox;
