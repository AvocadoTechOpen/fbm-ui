import * as React from 'react';
import { RadioGroup as MuiRadioGroup, RadioGroupProps as MuiRadioGroupProps } from '@mui/material'

import Radio, { RadioProps } from '../Radio'

export interface RadioGroupProps extends MuiRadioGroupProps {
  options?: RadioProps[];
}

const RadioGroup: React.FC<RadioGroupProps> = React.forwardRef(({
  children: childrenProp,
  options,
  ...RadioGroupProps
}, ref) => {

  let children = childrenProp
  if (children == null && (Array.isArray(options) && options.length > 0)) {
    children = options.map(opt => {
      return <Radio key={opt.value as string} {...opt} />
    })
  }

  return (
    <MuiRadioGroup {...RadioGroupProps} ref={ref}>
      {children}
    </MuiRadioGroup>
  )
})

RadioGroup.defaultProps = {
  row: true,
}

export default RadioGroup;