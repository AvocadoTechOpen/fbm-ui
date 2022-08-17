import React from 'react';
import { FormControlLabel, styled, FormControlLabelProps as MuiFormControlLabelProps, Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps, createChainedFunction, checkboxClasses } from '@mui/material';
import useCheckboxGroup from '../CheckboxGroup/useCheckboxGroup'

export interface CheckboxProps {
  ref?: MuiCheckboxProps['ref'];
  label?: string | number | React.ReactElement;
  value?: unknown;
  disabled?: boolean;
  name?: string;
  checked?: boolean;
  onChange?: (event: React.SyntheticEvent, checked: boolean) => void;
  FormControlLabelProps?: MuiFormControlLabelProps;
  CheckboxProps?: MuiCheckboxProps;
}

function areEqualValues(values, name): boolean {
  return values?.includes?.(name)
}

const FormControlLabelRoot = styled(FormControlLabel)(() => {
  return {
    [`& .${checkboxClasses.root}`]: {
      width: 36,
      height: 36,
      "&:hover": {
        background: "rgba(76, 175, 80, .08)",
      },
    },
    [`& .${checkboxClasses.disabled}`]: {
      color: "rgba(0,0,0,.12) !important",
    },
  };
});

const Checkbox: React.FC<CheckboxProps> = React.forwardRef((props, ref) => {
  const {
    label,
    value,
    disabled,
    name: nameProp,
    checked: checkedProp,
    onChange: onChangeProp,
    FormControlLabelProps,
    CheckboxProps,
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
  if (typeof checked === 'undefined' && typeof value === 'boolean') {
    checked = value
  }

  return (
    <FormControlLabelRoot
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      checked={checked}
      disabled={disabled}
      control={<MuiCheckbox ref={ref} {...CheckboxProps} />}
      {...FormControlLabelProps}
      {...otherProps}
    />
  )
})

Checkbox.defaultProps = {
  label: '',
}

export default Checkbox;
