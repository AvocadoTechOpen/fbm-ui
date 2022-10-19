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
 * title: 基本使用
 */
import * as React from 'react';
import { TreeSelect, Checkbox, Box, Demo } from 'fbm-ui';

export default () => {
  const [value, setValue] = React.useState('');
  const [multiSelect, setMultiSelect] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)


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
      <Box sx={{mb: 2}}>
        <Checkbox 
          label="多选"
          checked={multiSelect}
          onChange={(e) =>{
            setMultiSelect(!multiSelect)
            setValue([])
          }} 
        />
        <Checkbox 
          label="disabled"
          checked={disabled}
          onChange={(e) => setDisabled(!disabled)} 
        />
      </Box>

      <TreeSelect
        multiple={multiSelect}
        size='large'
        data={data}
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
    </Demo>
  );
};
```



```tsx
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
```