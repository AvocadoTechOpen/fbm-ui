---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---

# TreeSelect 树结构 (TODO)
## 代码演示

```tsx
/**
 * title: 扩展其他样式
 */
import * as React from 'react';
import { TreeSelect, Demo } from 'fbm-ui';

export default () => {
  const [value, setValue] = React.useState([]);
  
  const data = [
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
    }
  ]
  return (
    <Demo>
      <TreeSelect
        multiple
        size='large'
        data={data}
      />
    </Demo>
  );
};
```