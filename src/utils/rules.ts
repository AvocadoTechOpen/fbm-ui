import moment from 'moment'
import { isURL } from 'validator'
import { isArray, isDate, isObject, chineseLength } from './index'

// 邮箱正则
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 邮箱正则
export const MOBILE_REGEX = /^1[3456789]\d{9}$/;

const isEmpty = (item) => {
  // 空字符串
  if (typeof item === 'string' && item.trim() === '') return true

  //undefined
  if (item === undefined) return true

  // null
  if (item === null) return true

  //数组
  if (isArray(item)) {
    const found = item.find(element => {
      return !isEmpty(element)
    })
    return found === undefined
  }
  //空对象
  if (isObject(item)) {
    return Object.keys(item).length === 0
  }
}


// 验证是否必填
export const required = (message?: string) => {
  let fn = ({ value, label }) => {
    if (isEmpty(value)) {
      if (message) return message
      let labelStr = '此处'
      if (label && typeof label === 'string') {
        if (label.endsWith('*')) {
          labelStr = label.slice(0, -1)
        } else {
          labelStr = label
        }
      }
      return `${labelStr}不能为空`
    }

    fn = null
  }

  return fn
}

// 验证手机号
export const mobile = (message?: string) => {
  let fn = ({ value }) => {
    if (value && !MOBILE_REGEX.test(value)) {
      return message || '请输入正确的手机号';
    }

    fn = null
  }
  return fn
}

// 验证邮箱地址
export const email = (message?: string) => {
  let fn = ({ value }) => {
    if (value && !EMAIL_REGEX.test(value)) {
      return message || '请输入正确的邮箱'
    }

    fn = null
  }

  return fn
}

export const date = (message?: string) => {
  let fn = ({ value }) => {
    if (!isDate(value)) {
      return message || '请输入正确的日期格式'
    }

    fn = null
  }
  return fn
}

export const time = (message?: string) => {
  let fn = ({ value }) => {
    if (!moment(value, 'HH:mm', true).isValid()) {
      return message || '请输入正确的时间格式'
    }

    fn = null
  }
  return fn
}

export const max = () => {
  let fn = ({ value, max }) => {
    const len: number = chineseLength(value)
    if (len > max) {
      return true
    }
    fn = null
  }
  return fn
}

export const url = (message: string = '请输入正确的URL格式') => {
  let fn = ({ value }) => {
    if (!isURL(value)) {
      return message || '请输入正确的时间格式'
    }

    fn = null
  }
  return fn
}

export default {
  required,
  mobile,
  email,
  date
}