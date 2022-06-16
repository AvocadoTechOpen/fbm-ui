import React from 'react';
import { useControlled, FormGroup, unstable_useId as useId } from '@mui/material'
import CheckboxGroupContext from './CheckboxGroupContext';
import type { CheckboxGroupProps } from './types'

const CheckboxGroup: React.FC<CheckboxGroupProps> = React.forwardRef((props, ref) => {
  const {
    value: valueProp,
    defaultValue,
    name: nameProp,
    onChange,
    children,
    ...FormGroupProps
  } = props

  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'CheckboxGroup',
  });

  const handleChange = (event) => {
    const checked = event?.target.checked;
    let newValue = value
    if (checked) {
      newValue = value.concat(event?.target?.value)
    } else {
      newValue = value?.filter(v => v !== event?.target?.value)
    }
    setValueState(newValue)
    onChange?.(event, newValue)
  }

  const name = useId(nameProp);

  return (
    <CheckboxGroupContext.Provider value={{ name, value, onChange: handleChange }}>
      <FormGroup role="checkboxgroup" ref={ref} {...FormGroupProps}>
        {children}
      </FormGroup>
    </CheckboxGroupContext.Provider>
  )
})

CheckboxGroup.defaultProps = {
  defaultValue: [],
  value: [],
  row: true,
}

export default CheckboxGroup;