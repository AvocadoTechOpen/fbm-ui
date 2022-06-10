import React from 'react';

import Outlined, { OutlinedInputProps } from './Outlined'
import Standard, { StandardInputProps } from './Standard'
import ClearButton  from './ClearButton'

const variantComponent = {
  standard: Standard,
  outlined: Outlined,
};

export type Variant = 'outlined' | 'filled' | 'standard'
export interface BaseInputProps {
  variant?: Variant
  clear?: boolean;
  onClear?: React.MouseEventHandler<HTMLButtonElement>;
}

export type InputProps = BaseInputProps & OutlinedInputProps & StandardInputProps

const Input: React.FC<InputProps> = React.forwardRef((props, ref) => {
  const {
    value,
    variant,
    clear,
    onClear,
    ...InputProps
  } = props

  const InputComponent = variantComponent[variant];

  return (
    <InputComponent
      ref={ref}
      value={value}
      {...InputProps}
    />
  )
})

Input.conponentName = 'Input'

Input.defaultProps = {
  variant: 'outlined',
  fullWidth: true,
}

export default Input

