import React from 'react'
import { RadioGroup as MuiRadioGroup, RadioGroupProps as MuiRadioGroupProps } from '@mui/material'

export interface RadioGroupProps extends MuiRadioGroupProps { }

const RadioGroup: React.FC<RadioGroupProps> = MuiRadioGroup

RadioGroup.defaultProps = {
  row: true,
}

export default RadioGroup;