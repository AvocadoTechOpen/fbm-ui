---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---

# TreeSelect 树结构 
## 代码演示

```tsx
/**
 * title: 基本使用
 */
import * as React from 'react';
import { TreeSelect, Checkbox, Box, Demo } from 'fbm-ui';

export default () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event, value) => {
    setValue(value)
  }

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
        data={data}
        value={value}
        onChange={handleChange}
      />
    </Demo>
  );
};
```

```tsx
/**
 * title: 多选
 */
import * as React from 'react';
import { TreeSelect, Checkbox, Box, Demo } from 'fbm-ui';

export default () => {
  const [value, setValue] = React.useState([]);

  const handleChange = (event, value) => {
    setValue(value)
  }

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
        multiple={true}
        size='large'
        data={data}
        value={value}
        onChange={handleChange}
      />
    </Demo>
  );
};
```

```tsx
/**
 * title: 禁用
 */
import * as React from 'react';
import { TreeSelect, Checkbox, Box, Demo } from 'fbm-ui';

export default () => {
  const [value, setValue] = React.useState([]);

  const handleChange = (event, value) => {
    setValue(value)
  }

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
        multiple={true}
        size='large'
        value={['0-0-1', ['0-0-2']]}
        data={data}
        value={value}
        onChange={handleChange}
      />
    </Demo>
  );
};
```



<!-- ```tsx
/**
 * title: 回填数据
 */
import * as React from 'react';
import { TreeSelect, Checkbox, Box, Demo } from 'fbm-ui';

export default () => {
  const [value, setValue] = React.useState(['0-0', '0-0-1', '0-1']);


  const handleChange = (event, value) => {
    setValue(value)
  }


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

    </Demo>
  );
};
``` -->