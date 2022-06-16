import React, { useMemo } from 'react'

import getValueLength from '../../utils/getValueLength'
import validate from '../FormItem/validate'
import { RuleItemType } from '../FormItem/types'
import { isFunction } from '../../utils'

export default function useTextField(props) {
  const {
    max,
    inputProps,
    InputProps,
    error: errorProp,
    value: valueProp,
    onChange: onChangeProp,
    onBlur: onBlurProp,
    validate: validateFn,
    required: requiredProp,
    rules: rulesProp
  } = props

  const [error, setError] = React.useState(errorProp)

  const rules = useMemo<RuleItemType[]>(() => {
    let _rules = []
    if (rulesProp?.length > 0) {
      _rules = rulesProp?.map(rule => {
        if (rule.required) {
          return {
            type: 'required',
            ...rule,
          }
        }
        return rule
      })
    }

    // 添加必填规则
    if (requiredProp) {
      _rules.push({
        type: 'required'
      })
    }
    // 添加最大长度限制
    if (max) {
      _rules.push({
        type: 'max'
      })
    }

    return _rules
  }, [requiredProp, rulesProp, max])


  const validateRules = React.useCallback(async (value = valueProp) => {
    const ruleError = await validate({
      value,
      max,
      rules,
      label: props.label,
    })
    console.log(rules, value, ruleError)
    setError(ruleError)
    return ruleError
  }, [valueProp])

  const handleChange = (event) => {
    onChangeProp?.(event)
    inputProps?.onChange?.(event)
    const value = event?.target ? event?.target?.value : event
    validateRules(value)
  }

  const handleBlur = (event) => {
    onBlurProp?.(event)
    inputProps?.onBlur?.(event)
    const value = event?.target ? event?.target?.value : event
    validateRules(value)
  }

  const handleValidate = React.useCallback(async (value = valueProp) => {
    // onChang 验证没通过
    if (error !== undefined) return error
    // 没触发onchange，则重新调一遍ruls验证
    if (error === undefined) {
      const ruleError = await validateRules()
      if (ruleError) {
        return ruleError
      }
    }
    // rules通过才走validate验证
    if (validateFn && isFunction(validateFn)) {
      const errMsg: string = await validateFn(value, props)
      setError(errMsg)
    }
  }, [error, valueProp])

  const { length } = getValueLength({ value: valueProp, max })

  return Object.assign(props, {
    error: errorProp || error,
    length,
    setError,
    handleValidate: handleValidate,
    InputProps: {
      ...inputProps,
      ...InputProps,
      value: valueProp,
      onChange: handleChange,
      onBlur: handleBlur,
    }
  })
}
