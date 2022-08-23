---
nav:
  title: 组件
  path: /components
group:
  title: 布局
---
# Tabs 标签页 (TODO)
## 代码演示

```tsx
/**
 * title: 基本使用
 */
import * as React from 'react';
import { Demo,  Tabs } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState('tab1')

  const tabs = [
    {
      label: 'tab1',
      value: 'tab1'
    },
    {
      label: 'tab2',
      value: 'tab2'
    }
  ]
  
  const handeChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
    <Demo>
      <Tabs onChange={handeChange} value={value} tabs={tabs} />
    </Demo>
  )
}
```

<API></API>