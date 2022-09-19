import React from 'react';
import { RadioCheckedIcon, RadioIcon } from '../icons'
import {
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
  FormControlLabel,
  FormControlLabelProps,
  styled,
  radioClasses,
  formControlLabelClasses
} from '@mui/material';

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

const FormControlLabelRoot = styled(FormControlLabel)(() => ({
  [`& .${formControlLabelClasses.label}`]: {
    fontSize: 14,
  },
}));

const Radio = styled(MuiRadio)(() => {
  return {
    color: 'rgba(0,0,0,.26)',
    width: 36,
    height: 36,
    [`&.${radioClasses.disabled}`]: {
      color: 'rgba(0,0,0, .12)',
      [`&.${radioClasses.checked}`]:{
        color: 'rgba(0,0,0, .24)',
      }
    }
  }
})

const FormControlLabelAndRadio: React.FC<RadioProps> = React.forwardRef(({
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
    <FormControlLabelRoot
      value={value}
      label={label}
      disabled={disabled}
      control={
        <Radio
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

FormControlLabelAndRadio.defaultProps = {
  size: 'medium',
  label: '',
  checkedIcon: <RadioCheckedIcon />,
  icon: <RadioIcon />,
}

export default FormControlLabelAndRadio;
