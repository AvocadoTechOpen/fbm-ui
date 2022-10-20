import React, { useState, forwardRef, useImperativeHandle } from 'react';
import TextField, { useTextField } from '../TextField';
import MobileArea, { OptionType } from './MobileArea';
import { BoxProps } from '../../mui'

export const DEFAULT_MOBILE_RULES = [{ required: true }, { type: 'mobile' }];


export interface MobileTextFieldProps {
  options: OptionType[];
  mobile: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  area: OptionType | null;
  onAreaChange: (area: OptionType) => void;
  size?: 'small';
  rules?: any[];
  sx?: BoxProps['sx'];
  disabled?: boolean;
}

export interface MobileTextFieldHanle {
  setError: (error: string) => void;
  validate: () => Promise<any>;
  error: string
}

const MobileTextField = forwardRef<MobileTextFieldHanle, MobileTextFieldProps>(
  ({ rules, options, mobile, onChange, area, onAreaChange, size, sx, disabled, ...rest }, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    
    const handleOpenChange = (o: boolean) => {
      setOpen(o);
    };
    
    const mobileFieldProps = useTextField({
      value: mobile,
      label: '手机号*',
      onChange,
      size,
      disabled,
      rules: rules || DEFAULT_MOBILE_RULES,
      InputProps: {
        placeholder: '请输入手机号',
        endAdornment: (
          <MobileArea
            size={size}
            disabled={disabled}
            area={area}
            open={open}
            options={options}
            onChange={onAreaChange}
            onOpenChange={handleOpenChange}
          />
        ),
      },
      ...rest,
      sx: {
        ...(sx || {}),
        '& .MuiInputLabel-root[data-shrink="false"]': {
          left: size === 'small' ? '75px' : '100px',
        },
        '& .MuiInputLabel-root[data-shrink="true"]': {
          '&+.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline legend': {
            minWidth: 'fit-content',
          },
        },
        '& .MuiInputLabel-root.Mui-focused:not(.Mui-error)': {
          '&+.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4caf50',
          },
        },
        '&>.MuiOutlinedInput-root>.MuiOutlinedInput-input': {
          paddingLeft: size === 'small' ? '90px' : '112px',
        },
        // Autocomplete获取焦点  textfield也需要
        ...(open && {
          '&>.MuiOutlinedInput-root:not(.Mui-error):hover>.MuiOutlinedInput-notchedOutline': {
            borderColor: '#4caf50',
          },
          '&>.MuiOutlinedInput-notchedOutline': {
            borderColor: '#4caf50',
            borderWidth: 1,
          },
          '& .MuiInputLabel-root': {
            color: '#4caf50',
          },
          '& .Mui-error': {
            color: '#ff6c6c',
            '&+.MuiOutlinedInput-root': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ff6c6c',
              },
            },
          },
        }),
      },
    });
    useImperativeHandle(ref, () => ({
      setError: mobileFieldProps.setError,
      validate:  () => {
        return mobileFieldProps.handleValidate();
      },
      error: mobileFieldProps.error,
    }));

    return <TextField id='mobile-text' {...mobileFieldProps} />;
  },
);


export default MobileTextField;
