import React from 'react';
import { RadioCheckedIcon, RadioIcon } from '../icons'
import { Radio as MuiRadio, RadioProps as MuiRadioProps, FormControlLabel, FormControlLabelProps } from '@mui/material';

export interface RadioProps {
  ref?: MuiRadioProps['ref'];
  label?: string | number | React.ReactElement;
  size?: 'small' | 'medium';
  value?: unknown;
  disabled?: boolean;
  FormControlLabelProps?: FormControlLabelProps;
  RadioProps?: MuiRadioProps;
  checkedIcon?: React.ReactNode;
  icon?: React.ReactNode;
}

const Radio: React.FC<RadioProps> = React.forwardRef(({
  size,
  value,
  label,
  disabled,
  FormControlLabelProps,
  RadioProps,
  icon,
  checkedIcon,
}, ref) => {
  return (
    <FormControlLabel
      value={value}
      label={label}
      disabled={disabled}
      control={
        <MuiRadio
          checkedIcon={checkedIcon}
          icon={icon}
          ref={ref} 
          size={size} 
          {...RadioProps}
        />
      }
      {...FormControlLabelProps}
    />
  )
})

Radio.defaultProps = {
  size: 'medium',
  label: '',
  checkedIcon: <RadioCheckedIcon />,
  icon: <RadioIcon />,

}

export default Radio;
