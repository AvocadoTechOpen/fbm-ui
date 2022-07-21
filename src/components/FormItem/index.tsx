import React, { useMemo, useEffect, useCallback } from 'react'
import { useFormikContext } from 'formik'
import { FormProps } from '../Form'

import FormItem from './FormItem'
import validate from './validate'
import { toArray,  } from '../../utils'
import {cloneElement, isValidElement } from '../../utils/reactNode'
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
    size,
    children,
    label: labelProp,
    required: requiredProp,
    rules: rulesProp,
    onChange,
    onBlur,
    trigger,
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


  const { registerField, unregisterField, getFieldProps, getFieldMeta, getFieldHelpers, fast } = (useFormikContext?.()  || {})
  const field = getFieldProps?.({ name })
  const meta = getFieldMeta?.(name)
  const helpers = getFieldHelpers?.(name)
  
  useEffect(() => {
    if (name) {
      registerField?.(name, {
         // @ts-ignore
        validate:  (value) => {
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

  const formatEvent = useCallback((event: React.FocusEvent<HTMLInputElement> | any) => {
    if (event?.target) {
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
    if (meta?.touched === false) {
      helpers?.setTouched(true)
    }
    field?.onChange?.(formatEvent(event))
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    field?.onBlur?.(formatEvent(event))
  }

  // ======================= Children =======================
  let childNode: React.ReactNode = null;
  const mergedControl: FormItemProps = {
    name,
    // @ts-ignore
    error,
    onChange: handleChange,
    onBlur: handleBlur,
  }
  if (typeof children === 'function') {
    childNode = children(mergedControl)
  } else if (isValidElement(children)) {
    // 如果children没有lable 则使用formItem.props.lable
    if (children?.props?.label === undefined) {
      mergedControl.label = label
    }
    // 如果children没有lable 则使用formItem.props.size
    if (children?.props?.size === undefined) {
      mergedControl.size = size
    }
    // 如果children没有lable 则使用 field.value
    if (children?.props?.value === undefined) {
      mergedControl.value = field?.value
    }

    const childProps = { ...children?.props, ...mergedControl };

    const triggers = toArray(trigger);
    triggers.forEach(eventName => {
      childProps[eventName] = (event: any) => {
        mergedControl[eventName]?.(event);
        children.props[eventName]?.(event);
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
  trigger: ['onBlur', 'onChange'],
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