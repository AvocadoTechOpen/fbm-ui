/**
 * 表单项的内容
 */
import React from 'react'
import styled from '@mui/material/styles/styled'

import {
  FormControl,
  InputLabel,
  FormHelperText,
  inputLabelClasses,
  FormControlProps,
  InputLabelProps,
} from '@mui/material'

import Input, { FbmInputProps } from '../Input'
import { isEmpty } from '../../utils'
import {  HelperProps, FbmInputLabelProps } from './types'


const FormItemRoot: React.FC<FormControlProps> = styled(FormControl)({
  display: 'block',
  height: '84px',
});

const LabelRoot = styled(InputLabel)(({ variant, size }: FbmInputLabelProps) => ({
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
  const { children: childrenProp, extra, length, max, ...helperTextProps } = props

  let children = childrenProp
  if (!children) {
    children = extra
  }

  return (
    <HelperTextRoot {...helperTextProps}>
      <span style={{ flex: 1 }}>
        {children || extra}
      </span>
      {
        (max && max > 0) && (
          <span>
            {length}/{max}
          </span>
        )
      }
    </HelperTextRoot>
  )
}

const FbmFormItem: React.FC<FbmFormItemProps> = React.forwardRef((props, ref) => {
  const {
    meta,
    helpers,
    clear,
    onClear,
    label,
    error,
    max,
    extra,
    length,
    InputLabelProps: LabelPropsProp,
    children: childrenProp,
    variant,
    value,
    inputProps,
    InputProps,
    inputRef,
    autoComplete,
    autoFocus = false,
    defaultValue,
    fullWidth = true,
    id,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    rows,
    endAdornment,
    readOnly,
    size,
    type,
  } = props

  // status
  const statusError: boolean = error && !isEmpty(error)
  const htmlFor = `${name||id}-htmlFor`;

  let children = null
  if (childrenProp) {
    children = childrenProp
  } else {
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
      variant={(variant as FormControlProps['variant'])}
      error={statusError}
    >
      <Label
        variant={(variant as InputLabelProps['variant'])}
        id={id}
        htmlFor={htmlFor}
        {...LabelPropsProp}
      >
        {label}
      </Label>

      {children}

      <Helper
        id={id}
        extra={extra}
        error={statusError}
        max={max}
        length={length}
      >
        {(error as ErrorType)?.isBeyond ? extra : error}
      </Helper>
    </FormItemRoot>
  )
})

FbmFormItem.defaultProps = {
  length: 0,
  variant: 'outlined',
  fullWidth: true,
}

export default FbmFormItem;
