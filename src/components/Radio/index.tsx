import React from 'react';
import { Radio as MuiRadio, RadioProps as MuiRadioProps, FormControlLabel, FormControlLabelProps, styled } from '@mui/material';

export interface RadioProps {
  label?: string | number | React.ReactElement;
  size?: 'small' | 'medium';
  ref?: MuiRadioProps['ref'];
  value?: unknown;
  disabled?: boolean;
  FormControlLabelProps?: FormControlLabelProps;
  RadioProps?: MuiRadioProps;
}

const Radio: React.FC<RadioProps> = React.forwardRef(({
  size,
  value,
  label,
  disabled,
  FormControlLabelProps,
  RadioProps,
}, ref) => {
  return (
    <FormControlLabel
      value={value}
      label={label}
      disabled={disabled}
      control={<MuiRadio ref={ref} size={size} {...RadioProps} />}
      {...FormControlLabelProps}
    />
  )
})

Radio.defaultProps = {
  size: 'medium',
  label: ''
}

export default Radio;
