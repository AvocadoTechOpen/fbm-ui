---
nav:
  title: 组件
  path: /components
group:
  title: 布局
---
# Tabs 标签页
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
      label: 'Item One',
      value: 'tab1'
    },
    {
      label: 'Item Two',
      value: 'tab2'
    },
    {
      label: 'Item Three',
      value: 'tab3',
      disabled: true,
    }
  ]
  
  const handeChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
    <Demo white elevation={2}>
      <Tabs onChange={handeChange} value={value} tabs={tabs} />
    </Demo>
  )
}
```

```tsx
/**
 * title: borderBottom
 * desc: 不需要下边框
 */
import * as React from 'react';
import { Demo,  Tabs } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState('tab1')

  const tabs = [
    {
      label: 'Item One',
      value: 'tab1'
    },
    {
      label: 'Item Two',
      value: 'tab2'
    },
    {
      label: 'Item Three',
      value: 'tab3',
      disabled: true,
    }
  ]
  
  const handeChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
    <Demo white elevation={2}>
      <Tabs borderBottom={'none'} onChange={handeChange} value={value} tabs={tabs} />
    </Demo>
  )
}
```



```tsx
/**
 * title: scrollButtons
 * desc: 当tab过多时显示左右切换按钮
 */
import * as React from 'react';
import { Demo,  Tabs, Tab } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState('tab1')

  const tabs = [
    {
      label: 'Item One',
      value: 'tab1'
    },
    {
      label: 'Item Two',
      value: 'tab2'
    },
    {
      label: 'Item Three',
      value: 'tab3',
    },
    {
      label: 'Item Four',
      value: 'tab4'
    },
    {
      label: 'Item Five',
      value: 'tab5'
    },
     {
      label: 'Item Six',
      value: 'tab6'
    },
     {
      label: 'Item Seven',
      value: 'tabh7'
    },
  ]
  
  const handeChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
    <Demo white elevation={2} sx={{ width: '480px' }}>
      <Tabs
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          value={value}
          borderBottom={'none'}
          tabs={tabs}
          onChange={handeChange} 
        />
    </Demo>
  )
}
```

<API></API>