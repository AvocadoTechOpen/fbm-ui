import React, { useMemo } from 'react'

import FormItem, { FbmFormItemProps } from './FormItem'
import { FbmInputProps } from '../Input'
import useFormItem from './useFormItem'
import { isEmpty } from '../../utils'

const FormItemIndex: React.FC<FbmFormItemProps & FbmInputProps> = ({
  name: nameProp,
  value: valueProp,
  label: labelProp,
  rules: rulesProp,
  clear,
  extra,
  max,
  required,
  children,
  autoFocus,
  inputProps,
  InputProps,
  ...otherProps
}) => {

  // 给label加*
  const label = useMemo(() => {
    if (required && (labelProp && typeof labelProp === 'string' && !labelProp.endsWith('*'))) {
      return `${labelProp}*`
    }
    return labelProp
  }, [labelProp])

  // 如果required为true， 给rules添加必填项的规则
  const rules = useMemo(() => {
    if (required) {
      const requiredRule = ([{ required: true }] as any)
      if (isEmpty(rulesProp)) {
        return requiredRule
      }

      const { required } = (rulesProp[0] as any)
      if (required === undefined) {
        return requiredRule.concat(rulesProp)
      }
      return rulesProp
    }

    return rulesProp
  }, [required, rulesProp])

  const {
    name,
    value,
    length, //chineseLength
    meta,
    helpers,
    onChange,
    onBlur,
  } = useFormItem({
    name: nameProp,
    value: valueProp,
    max,
    rules,
    label,
  })

  let errorMsg: string = undefined
  if (meta?.touched === true) {
    errorMsg = meta.error
  }

  return (
    <FormItem
      name={name}
      value={value}
      label={label}
      length={length}
      max={max}
      extra={extra}
      error={(errorMsg as unknown as FbmFormItemProps['error'])}
      meta={meta}
      helpers={helpers}
      onChange={onChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
      inputProps={{
        clear,
        ...inputProps
      }}
      {...InputProps}
      {...otherProps}
    >
      {children}
    </FormItem>
  )
}

export default FormItemIndex