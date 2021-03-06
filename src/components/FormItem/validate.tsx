
import { isFunction } from '../../utils'
import * as ruleFuns from '../../utils/rules'
import { RuleItemType, FormItemProps, Error } from './types'

interface IValidateParams {
  /** 输入框value */
  value: FormItemProps['value'];
  /** FormItem Label */
  label: FormItemProps['label']
  /** 验证规则  */
  rules?: RuleItemType[]
  /** 输入框最大长度  */
  max?: number;
}

/**
 * @description: 提供表单验证
 * @param {*} value 输入框值
 * @param {*} props useFormItemParams
 */
export default function validate(input: IValidateParams): Error {
  const { rules } = input
  const rulesLen = rules?.length || 0
  if (rulesLen === 0) {
    return undefined
  }

  for (let i = 0; i < rulesLen; i++) {
    const rule: RuleItemType = rules[i]

    if (isFunction(rule)) {
      const error: Error = rule(input)
      
      if (error) {
        return error
      }
    }

    if (typeof rule === 'object') {
      const { message, type } = rule
      const validateFn = ruleFuns?.[type]
      const error: Error = validateFn?.(message)?.(input)
      if (error !== undefined) {
        return error
      }
    }
  }

  return undefined;
}