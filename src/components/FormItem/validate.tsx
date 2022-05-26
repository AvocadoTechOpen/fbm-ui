import getValueLength, { GetValueLengthReturn } from '../../utils/getValueLength'
import { isFunction } from '../../utils'
import * as ruleFuns from '../../utils/rules'
import { UseFormItemParams } from './useFormItem'
import { RuleItemType } from './FormItem'

/**
 * @description: 提供表单验证
 * @param {*} value 输入框值
 * @param {*} props useFormItemParams
 */
export default async function validate(value, formItem: UseFormItemParams): Promise<string | GetValueLengthReturn | undefined> {
  const { rules, max } = (formItem || {})

  return new Promise(async (resolve) => {
    if (rules && rules.length > 0) {
      const len = rules.length

      for (let i = 0; i < len; i++) {
        const rule: RuleItemType = formItem.rules[i]

        // 处理报错方法
        if (isFunction(rule)) {
          const errorMsg: string | void = await rule(value, formItem)
          if (errorMsg) {
            return resolve(errorMsg)
          }
        }

        // 处理对象 { type: 'RuleName' ...parasm }
        if (typeof rule === 'object') {
          const { message, required, type } = rule
          const key = required ? 'required' : type
          const ruleFn = ruleFuns[key]

          if (isFunction(ruleFn)) {
            const errorMsg: string = await ruleFn(message)(value, formItem)
            if (errorMsg) {
              return resolve(errorMsg)
            }
          }
        }
      }
    }

    if (max) {
      const { isBeyond, length } = getValueLength({ value, max })
      if (isBeyond) {
        return resolve({ isBeyond, length })
      }
    }

    return resolve(undefined)
  })
}