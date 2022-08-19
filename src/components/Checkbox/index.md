---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---
# Checkbox 复选框
## 代码演示

```jsx
/**
 * title: 基本使用
 */
import * as React from 'react';
import { 
  Checkbox,
  Demo,
} from 'fbm-ui'

export default () => {
  return (
    <Demo>
      <Checkbox checked label="选中" />
      <Checkbox disabled label="禁用" />
      <Checkbox disabled checked label="选中并禁用" />
    </Demo>
  )
}
```

```jsx
/**
 * title: CheckboxGroup
 * desc: 复选框组，默认竖排
 */
import * as React from 'react';
import { 
  Demo,
  Checkbox,
  CheckboxGroup,
} from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState(undefined)

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }
  return (
    <Demo>
      <CheckboxGroup value={value} onChange={handleChange}>
        <Checkbox value={"A"} label="A" />
        <Checkbox value={"B"} label="B" />
        <Checkbox value={"C"} label="C" />
        <Checkbox value={"D"} label="D" />
      </CheckboxGroup>
    </Demo>
  )
}
```

```jsx
/**
 * title: CheckboxGroup
 * desc: 复选框组，横排
 */
import * as React from 'react';
import { 
  Demo,
  Checkbox,
  CheckboxGroup,
} from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState(undefined)

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }
  return (
    <Demo>
       <Checkbox
        CheckboxProps={{
          indeterminate: !!value
        }}
         label="all" 
      />
      <CheckboxGroup row={false} value={value} onChange={handleChange}>
        <Checkbox value={"A"} label="A" />
        <Checkbox value={"B"} label="B" />
        <Checkbox value={"C"} label="C" />
        <Checkbox value={"D"} label="D" />
      </CheckboxGroup>
    </Demo>
  )
}
```

