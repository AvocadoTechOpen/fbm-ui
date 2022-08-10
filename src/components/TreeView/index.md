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
import { Demo, TreeView, TreeItem } from 'fbm-ui'

export default () => {
 const [selected, setSelected ] = React.useState([])
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

  const hadnleNodeSelect = (e, nodeIds) => {
    console.log(nodeIds, '-----')
    setSelected(nodeIds)
  }

  return (
      <Demo>
        <TreeView 
          multiSelect 
          selected={selected}
          data={treeData}
          getNodeId={({ value }) => value}
          onNodeSelect={hadnleNodeSelect}
        />
      </Demo>
    )
}
```
