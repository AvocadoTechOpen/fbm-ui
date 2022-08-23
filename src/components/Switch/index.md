---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---
# Switch 滑动开关
## 代码演示

```tsx
/**
 * title: Switch组件
 * desc: 基本使用
 */
import * as React from 'react';
        
import { Demo, Switch } from 'fbm-ui'

export default () =>{
  const [checked, setChecked] = React.useState(false)

  const handleChange = (e) => {
    setChecked(e.target.checked)
  }

  return (
    <Demo>
      <Switch 
        sx={{ mb: 1 }}
        label={'大尺寸'}
        checked={checked}
        onChange={handleChange}
      />
      <br />
      <Switch 
        sx={{ mb: 1 }}
        label={'小尺寸'}
        size={'small'}
      />
      <br />
      <Switch 
        sx={{ mb: 2 }}
        label={'禁用'}
        disabled
      />
      <br />
      <Switch 
      label={'禁用'}
      disabled
      checked={true}
      />
    </Demo>
  )
}
```

<API></API>



