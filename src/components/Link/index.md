---
nav:
  title: 组件
  path: /components
group:
  title: 布局
---
# Link 通用
## 代码演示

```tsx
/**
 * title: 基本使用
 */
import * as React from 'react';
import { Demo, Link } from 'fbm-ui'

export default () =>{
  return (
    <Demo>
      <Link text="默认" href="#" />
      <Link sx={{ ml: 2 }} text="hover显示下划线" underline="hover" href="#" />
      <Link sx={{ ml: 2 }} text="一直显示下划线" underline="always" href="#" />
    </Demo>
  )
}
```
```tsx
/**
 * title: disabled
 */
import * as React from 'react';
import { Demo, Link } from 'fbm-ui'

export default () =>{
  return (
    <Demo>
      <Link disabled text="默认" href="#" />
      <Link disabled sx={{ ml: 2 }} text="hover显示下划线" underline="hover" href="#" />
      <Link disabled sx={{ ml: 2 }} text="一直显示下划线" underline="always" href="#" />
    </Demo>
  )
}
```


<API></API>