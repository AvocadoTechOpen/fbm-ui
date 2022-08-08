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

 const treeData = [
    {
      label: 'Node1',
      value: '0-0',
      children: [
        {
          label: 'Child Node1',
          value: '0-0-1',
        },
        {
          label: 'Child Node2',
          value: '0-0-2',
        },
      ],
    },
    {
      label: 'Node2',
      value: '0-1',
    },
  ];
  return (
      <Demo>
        <Tree 
          data={treeData}
          getNodeId={({ value }) => value}
        />
      </Demo>
    )
}
```
