---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---

#  Tree 树组件
## 代码演示

```tsx
/**
 * title: 基本
 * desc: 基本使用
 */
import * as React from 'react';
import { Demo, Tree } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState('22:22')

  return (
      <Demo>
          <Tree />
      </Demo>
    )
}
```
