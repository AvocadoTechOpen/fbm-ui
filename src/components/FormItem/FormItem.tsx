import React, { useMemo, memo } from 'react'
import styled from '@mui/material/styles/styled'
import {
  FormControl,
  InputLabel,
  FormHelperText,
  inputLabelClasses,
  FormControlProps,
} from '@mui/material'

import Input from '../Input'
import Select from '../Select'
import { chineseLength } from '../../utils'
import { FormItemProps, InputLabelProps, HelperProps } from './types'

const FormItemRoot: React.FC<FormControlProps> = styled(FormControl)({
  display: 'block',
  height: '84px',
  '& .MuiInputLabel-root': {
    background: '#fff',
    padding: '0 5px',
  }
});

const LabelRoot = styled(InputLabel)(({ variant, size }: InputLabelProps) => ({
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
}));

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
  const { children: childrenProp, extra, max, length, ...helperTextProps } = props

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
    options,
    SelectProps,
    name,
    label,
    error,
    max,
    extra,
    length,
    InputLabelProps: LabelPropsProp,
    HelperProps: HelperPropsProp,
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

  const htmlFor = `${name || ''}-htmlFor`;
  const statusError = useMemo<boolean>(() => {
    if (error === undefined || error === false) {
      return false
    }
    return true
  }, [error])
  let children = childrenProp
  if (childrenProp == null) {
    const InputElement = (
      <Input
        name={name}
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
        rows={rows}
        maxRows={maxRows}
        minRows={minRows}
        inputRef={inputRef}
        placeholder={placeholder}
        endAdornment={endAdornment}
        readOnly={readOnly}
        inputProps={inputProps}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onClear={onClear}
        {...InputProps}
      />
    )
    if (options) {
      children = <Select input={InputElement} value={value} options={options} {...SelectProps} />
    } else {
      children = InputElement
    }
  }

  const valLength = useMemo<number>(() => {
    if (max > 0 && (value && typeof value === 'string')) {
      return chineseLength(value)
    }
    return 0
  }, [value])

  const helperText = useMemo(() => {
    if (typeof error === 'boolean') {
      return extra
    }
    return error
  }, [error])

  return (
    <FormItemRoot
      ref={ref}
      variant={variant}
      error={statusError}
      {...FormControlProps}
    >
      <Label
        variant={(variant as InputLabelProps['variant'])}
        htmlFor={htmlFor}
        size={size}
        {...LabelPropsProp}
      >
        {label}
      </Label>
      {children}
      <Helper
        max={max}
        length={valLength}
        extra={extra}
        error={statusError}
        {...HelperPropsProp}
      >
        {helperText}
      </Helper>
    </FormItemRoot>
  )
})

FormItem.defaultProps = {
  length: 0,
  variant: 'outlined',
  fullWidth: true,
}

export default memo(FormItem, (prev, next) => {
  if (next.shouldMemoUpdate) {
    return next.shouldMemoUpdate(prev, next)
  }
  return false
})
