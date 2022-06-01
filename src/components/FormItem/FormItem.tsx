import React, { useMemo } from 'react'
import styled from '@mui/material/styles/styled'
import {
  FormControl,
  InputLabel,
  FormHelperText,
  inputLabelClasses,
  FormControlProps,
} from '@mui/material'

import Input from '../Input'
import { isEmpty } from '../../utils'
import { ErrorType, FormItemProps, InputLabelProps, HelperProps } from './types'

const FormItemRoot: React.FC<FormControlProps> = styled(FormControl)({
  display: 'block',
  height: '84px',
});

const LabelRoot = styled(InputLabel)(({ variant, size }: InputLabelProps) => {
  return {
    lineHeight: 1,
    zIndex: 1,
    top: '0',
    ...(variant === 'outlined' && {
      [`&.${inputLabelClasses.shrink}`]: {
        transform: 'translate(14px, -5px) scale(0.75)',
      }
    }),
    ...(variant === 'outlined' && size === 'small' && {
      top: '1px',
      [`&.${inputLabelClasses.shrink}`]: {
        transform: 'translate(14px, -7px) scale(0.75)',
      }
    })
  }
});

const HelperTextRoot = styled(FormHelperText)({
  display: 'flex',
  alignItems: 'center',
});

const Label: React.FC<InputLabelProps> = (props) => {
  const { children, ...labelProps } = props
  if (!children) return null
  return (
    <LabelRoot {...labelProps}>
      {children}
    </LabelRoot>
  )
}

const Helper: React.FC<HelperProps> = (props) => {
  const { children: childrenProp, extra, length, max, ...helperTextProps } = props

  let children = childrenProp
  if (!children) {
    children = extra
  }

  const count = useMemo<React.ReactNode>(() => {
    if (max === undefined || typeof max !== 'number') {
      return null;
    }
    return (
      <span>
        {length}/{max}
      </span>
    )
  }, [max, length])

  return (
    <HelperTextRoot {...helperTextProps}>
      <span style={{ flex: 1 }}>
        {children || extra}
      </span>
      {count}
    </HelperTextRoot>
  )
}

const FormItem: React.FC<FormItemProps> = React.forwardRef((props, ref) => {
  const {
    name,
    id,
    meta,
    helpers,
    label,
    error,
    max,
    extra,
    length,
    InputLabelProps: LabelPropsProp,
    children: childrenProp,
    value,
    inputProps,
    InputProps,
    inputRef,
    variant,
    clear,
    onClear,
    autoComplete,
    autoFocus = false,
    defaultValue,
    fullWidth = true,
    maxRows,
    minRows,
    multiline = false,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    rows,
    endAdornment,
    readOnly,
    size,
    type,
    ...FormControlProps
  } = props

  // status
  const statusError: boolean = error && !isEmpty(error)
  const htmlFor = `${name || ''}-htmlFor`;

  let children = childrenProp
  if (!childrenProp) {
    children = (
      <Input
        type={type}
        size={size}
        clear={clear}
        label={label}
        error={statusError}
        value={value}
        variant={variant}
        aria-describedby={htmlFor}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        fullWidth={fullWidth}
        multiline={multiline}
        name={name}
        rows={rows}
        maxRows={maxRows}
        minRows={minRows}
        id={id}
        inputRef={inputRef}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onClear={onClear}
        placeholder={placeholder}
        endAdornment={endAdornment}
        readOnly={readOnly}
        inputProps={inputProps}
        {...InputProps}
      />
    )
  }

  return (
    <FormItemRoot
      variant={variant}
      error={statusError}
      {...FormControlProps}
    >
      <Label
        variant={(variant as InputLabelProps['variant'])}
        htmlFor={htmlFor}
        {...LabelPropsProp}
      >
        {label}
      </Label>

      {children}

      <Helper
        max={max}
        length={length}
        extra={extra}
        error={statusError}
      >
        {(error as ErrorType)?.isBeyond ? extra : error}
      </Helper>
    </FormItemRoot>
  )
})

FormItem.defaultProps = {
  length: 0,
  variant: 'outlined',
  fullWidth: true,
}

export default FormItem;
