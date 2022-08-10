import React, { useMemo, useEffect, useCallback } from 'react'
import { useFormikContext } from 'formik'

import FormItem from './FormItem'
import validate from './validate'
import { toArray, } from '../../utils'
import { cloneElement, isValidElement } from '../../utils/reactNode'
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
 * @description: 输入框验证，显示报错
 * @props {*} FormItemProps
 */
const FormItemIndex: React.FC<FormItemProps> = React.forwardRef((props, ref) => {
  const {
    name,
    max,
    size,
    children,
    label: labelProp,
    required: requiredProp,
    rules: rulesProp,
    trigger: triggerProp,
    fast: fastProp,
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
    if (required && (labelProp && typeof labelProp === 'string' && !labelProp?.endsWith?.('*'))) {
      return `${labelProp}*`
    }
    return labelProp
  }, [labelProp])


  const { registerField, unregisterField, getFieldProps, getFieldMeta, getFieldHelpers, fast = fastProp, trigger } = (useFormikContext?.() || {})
  const field = getFieldProps?.({ name })
  const meta = getFieldMeta?.(name)
  const helpers = getFieldHelpers?.(name)

  useEffect(() => {
    if (name) {
      registerField?.(name, {
        // @ts-ignore
        validate: (value) => {
          const error: Error = validate({
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

  const formatEvent = useCallback((event: React.FocusEvent<HTMLInputElement>, newValue) => {
    let value
    if (newValue !== undefined) {
      value = newValue
    } else if (event?.target?.value !== undefined) {
      value = event?.target?.value
    } else {
      value = event
    }

    return {
      target: {
        name,
        value: value,
      },
      type: props.type || 'custom',
    }
  }, [name])

  const triggers = useMemo(() => {
    // 优先使FromItemProps
    if (triggerProp != null) {
      return toArray(triggerProp)
    }

    // useForm 返回的trigger
    if (trigger != null) {
      return toArray(trigger)
    }

    // 默认支持 onChange时验证和onBlur时验证
    return ['onChange', 'onBlur']
  }, [triggerProp, trigger])

  const handleChange = (...args) => {
    if (triggers.includes('onChange')) {
      if (meta?.touched === false) {
        helpers?.setTouched(true)
      }
    }
    field?.onChange?.(formatEvent(...args))
    onChange?.(...args)
  }

  const handleBlur = (...args) => {
    if (triggers.includes('onBlur')) {
      field?.onBlur?.(formatEvent(...args))
    }
    onBlur?.(...args)
  }

  // 触发验证器
  const triggerEvents = {
    onChange: handleChange,
    onBlur: handleBlur,
  }

  // ======================= Children =======================
  let childNode: React.ReactNode = null;
  const mergedControl: FormItemProps = {
    name,
    // @ts-ignore
    error,
  }

  if (typeof children === 'function') {
    childNode = children({
      ...mergedControl,
      ...triggerEvents,
      value: field?.value,
      size,
      label
    })
  } else if (isValidElement(children)) {
    // 如果children没有lable 则使用formItem.props.lable
    if (children?.props?.label === undefined) {
      mergedControl.label = label
    }
    // 如果children没有value 则使用formItem.props.size
    if (children?.props?.size === undefined) {
      mergedControl.size = size
    }
    // 如果children没有value 则使用 field.value
    if (children?.props?.value === undefined) {
      mergedControl.value = field?.value
    }
    const childProps = { ...children?.props, ...mergedControl, };

    // events validate
    Object.keys(triggerEvents).forEach(eventName => {
      childProps[eventName] = (...arg) => {
        triggerEvents[eventName]?.(...arg);
        children.props[eventName]?.(...arg);
      };
    });

    childNode = (
      <MemoInput value={childProps?.value} update={children}>
        {cloneElement(children, childProps)}
      </MemoInput>
    )
  }

  return (
    <FormItem
      ref={ref}
      fast={fast}
      name={name}
      max={max}
      size={size}
      label={label}
      value={field?.value}
      // @ts-ignore
      error={error}
      onChange={handleChange}
      onBlur={handleBlur}
      {...FormItemProps}
    >
      {childNode}
    </FormItem>
  )
})

FormItemIndex.defaultProps = {
  rules: [],
  shouldMemoUpdate: (prev, next) => {
    if (prev.fast === true) {
      return (
        prev.name === next.name
        && prev.value === next.value
        && prev.label === next.label
        && prev.max === next.max
        && prev.length === next.length
        && prev.extra === next.extra
        && prev.error === next.error
        && (prev.options === next.options && prev.options?.length === next.options?.length)
        && Object.keys(prev).length === Object.keys(next).length
      )
    }
    return false
  }
}

export default FormItemIndex