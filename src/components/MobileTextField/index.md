---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---

# MobileTextField 带区号的手机输入框

## 代码演示

```tsx
/**
 * title: 基本
 * desc: 两种尺寸大小，分别是高度48px（默认）和36px（small） 受控
 */
import * as React from 'react';
import { MobileTextField, useMobileTextField, Layout } from 'fbm-ui'
const OPTIONS = [
  { key: '1', value: '+86', label: '中国', group: 'Z' },
  { key: '2', value: '+33', label: '法国', group: 'F' },
];

const DEFAULT_MOBILE = { mobile: '', mobileAreaCode: '1' };
export default () => {
  const [value, setValue] = React.useState('')
  const { mobileTextFieldProps } = useMobileTextField({
    options: OPTIONS,
    defaultMobile: DEFAULT_MOBILE
  })
  
  return (
    <Layout>
      <MobileTextField
        {...mobileTextFieldProps}
        label="默认尺寸"
        onChange={(e) => setValue(e.target.value) } 
        value={value} 
      />
      <br/>
      <MobileTextField 
        {...mobileTextFieldProps}
        label="small"
        size="small" 
        onChange={(e) => setValue(e.target.value) } 
        value={value}
      />
    </Layout>
  )
}
```


```tsx
/**
 * title: 校验
 * desc: rules  默认是 必填 且为手机号格式  可以自定义
 */
import * as React from 'react';
import { MobileTextField, useMobileTextField, Layout, Button } from 'fbm-ui'
const OPTIONS = [
  { key: '1', value: '+86', label: '中国', group: 'Z' },
  { key: '2', value: '+33', label: '法国', group: 'F' },
];

const DEFAULT_MOBILE = { mobile: '', mobileAreaCode: '1' };
export default () => {
  const [value, setValue] = React.useState('')
  const { mobileTextFieldProps, mobileRef, mobile } = useMobileTextField({
    options: OPTIONS,
    defaultMobile: DEFAULT_MOBILE
  })
  
  const handleClick = async () => {
    const result = await mobileRef.current.validate();
    console.log(result, mobile)
  }

  return (
    <Layout>
      <MobileTextField
        {...mobileTextFieldProps}
        label="手机号"
      />
      <Button variant="outlined" onClick={handleClick} >
        提交
      </Button>
    </Layout>
  )
}
```
