import React, { useMemo, useEffect } from 'react'
import {
  useFormikContext,
} from 'formik'

import FormItem from './FormItem'
import validate from './validate'
import { FormItemProps, RuleItemObjType, RuleItemType, Error } from './types'

/**
 * @description: 配合form组件使用
 * @props {*} FormItemProps
 */
const FormItemIndex: React.FC<FormItemProps> = React.forwardRef((props, ref) => {
  const {
    children,
    max,
    name,
    value: valueProp,
    label: labelProp,
    required: requiredProp,
    rules: rulesProp,
    onChange,
    onBlur,
    ...FormItemProps
  } = props

  const rules = useMemo<RuleItemType[]>(() => {
    const _rules = []
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

    return _rules.concat(rulesProp)
  }, [requiredProp, rulesProp, max])

  const required = useMemo<boolean>(() => {
    if (requiredProp) {
      return requiredProp
    }
    const requiredRule = rulesProp?.find((rule) => {
      if (typeof rule === 'object') {
        return rule.required === true
      }
    })
    return (requiredRule as RuleItemObjType)?.required || false
  }, [rules])

  const label = useMemo(() => {
    if (required && (labelProp && typeof labelProp === 'string' && !labelProp.endsWith('*'))) {
      return `${labelProp}*`
    }
    return labelProp
  }, [labelProp])

  const { registerField, unregisterField, getFieldProps, getFieldMeta } = useFormikContext() || {}
  const field = getFieldProps?.({ name })
  const meta = getFieldMeta?.(name)

  useEffect(() => {
    if (name) {
      registerField?.(name, {
        validate: async (value) => {
          const error: Error = await validate({
            value,
            rules,
            max,
            label: labelProp
          })
          return error
        }
      });
    }
    return () => {
      if (name) {
        unregisterField?.(name);
      }
    };
  }, [registerField, unregisterField, name, rules]);

  const error = useMemo<string>(() => {
    if (meta.touched) {
      return meta.error
    }
  }, [meta])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field?.onChange?.(event)
    onChange?.(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    field?.onBlur?.(event)
    onBlur?.(event)
  }

  return (
    <FormItem
      name={name}
      label={label}
      value={field?.value}
      max={max}
      // @ts-ignore
      error={error}
      onChange={handleChange}
      onBlur={handleBlur}
      {...FormItemProps}
    >
      {children}
    </FormItem>
  )
})

FormItemIndex.defaultProps = {
  rules: []
}

export default FormItemIndex