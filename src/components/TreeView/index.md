---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---

#  Tree 树组件 (TODO)
## 代码演示

```tsx
/**
 * title: 基本
 * desc: 基本使用
 */
import * as React from 'react';
import { Demo, TreeView, TreeItem, Box } from 'fbm-ui'

export default () => {
 const [selected, setSelected ] = React.useState([])
 const treeData = [
    {
      label: 'Node1',
      id: '0-0',
      children: [
        {
          label: 'Child Node1',
          id: '0-0-1',
        },
        {
          label: 'Child Node2',
          id: '0-0-2',
        },
      ],
    },
    {
      label: 'Node2',
      id: '0-1',
    },
  ];

  const hadnleNodeSelect = (e, nodeIds) => {
    setSelected(nodeIds)
  }

  return (
      <Demo>
        <Box sx={{ width: '500px' }}>
          <TreeView 
            selected={selected}
            data={treeData}
            onNodeSelect={hadnleNodeSelect}
          />
        </Box>
      </Demo>
    )
}
```

```tsx
/**
 * title: 多选
 * desc: 基本使用
 */
import * as React from 'react';
import { Demo, TreeView, TreeItem, Box } from 'fbm-ui'

export default () => {
 const [selected, setSelected ] = React.useState([])
 const treeData = [
    {
      label: 'Node1',
      id: '0-0',
      children: [
        {
          label: 'Child Node1',
          id: '0-0-1',
        },
        {
          label: 'Child Node2',
          id: '0-0-2',
        },
      ],
    },
    {
      label: 'Node2',
      id: '0-1',
    },
  ];

  const hadnleNodeSelect = (e, nodeIds, ...arg) => {
    console.log(nodeIds, arg)
    setSelected(nodeIds)
  }

  return (
      <Demo>
        <Box sx={{ width: '500px' }}>
          <TreeView 
            multiSelect
            selected={selected}
            data={treeData}
            onNodeSelect={hadnleNodeSelect}
          />
        </Box>
      </Demo>
    )
}
```