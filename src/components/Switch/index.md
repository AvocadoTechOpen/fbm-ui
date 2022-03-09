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
 * title: 基本
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
        label={'switch'}
        checked={checked}
        onChange={handleChange}
      />
    </Demo>
  )
}
```

<API></API>



