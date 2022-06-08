import React, { useMemo, useEffect, useCallback } from 'react'
import {
  useFormikContext,
} from 'formik'

import FormItem from './FormItem'
import validate from './validate'
import { FormItemProps, RuleItemObjType, RuleItemType, Error } from './types'

interface MemoInputProps {
  value: any;
  update: any;
  children: React.ReactNode;
}

const MemoInput = React.memo(
  ({ children }: MemoInputProps) => children as JSX.Element,
  (prev, next) => prev.value === next.value && prev.update === next.update,
);


/**
 * @description: 配合form组件使用
 * @props {*} FormItemProps
 */
const FormItemIndex: React.FC<FormItemProps> = React.forwardRef((props, ref) => {
  const {
    name,
    max,
    children: childrenProp,
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
    if (meta?.touched) {
      return meta?.error
    }
  }, [meta])

  const formatEvent = useCallback((event: React.FocusEvent<HTMLInputElement> | any) => {
    if (event.target){
      return event
    }
  
    return {
      target: {
        name,
        value: event,
      },
      type: props.type || 'custom',
    }
  }, [name])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field?.onChange?.(formatEvent(event))
    onChange?.(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    field?.onBlur?.(formatEvent(event))
    onBlur?.(event)
  }

  let children = childrenProp
  const childProps = {
    name,
    error,
    label: labelProp,
    value: field?.value,
    onChange: handleChange,
    onBlur: handleBlur,
  }
  if (children) {
    // 给children 传入onChange和onBlur事件
    children = (
      <MemoInput value={childProps?.value} update={children}>
        {React.cloneElement(children, childProps)}
      </MemoInput>
    )
  } else if (typeof children === 'function') {
    children = (
      <MemoInput value={childProps?.value} update={children}>
        {children?.(childProps)}
      </MemoInput>
    )
  }

  return (
    <FormItem
      ref={ref}
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