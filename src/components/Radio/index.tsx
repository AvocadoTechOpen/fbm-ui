import React from 'react';
import { Radio as MuiRadio, RadioProps as MuiRadioProps, FormControlLabel, FormControlLabelProps, radioClasses, styled } from '@mui/material';

export interface RadioProps extends FormControlLabelProps {
  size?: 'small' | 'medium'
}

const Radio: React.FC<RadioProps> = React.forwardRef((props, ref) => {
  const { size } = props
  return (
    <FormControlLabel
      ref={ref}
      control={<MuiRadio size={size} />}
      {...props}
    />
  )
})


Radio.defaultProps = {
  size: 'medium',
}

export default Radio;
