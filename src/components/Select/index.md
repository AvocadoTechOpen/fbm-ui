---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---
# Select 下拉选择
## 代码演示

```tsx
/**
 * title: 基本
 * desc: 基本使用
 */
import * as React from 'react';
        
import { Select, Layout } from 'fbm-ui'
import { MenuItem, FormControl, InputLabel} from '@mui/material'

export default () =>{
  const [age, setAge] = React.useState('')
  const options = [{"label":"等于","value":"eq"},{"label":"不等于","value":"notEq"},{"label":"包含","value":"contains"},{"label":"不包含","value":"notContains"},{"label":"为空","value":"isNull"},{"label":"不为空","value":"notNull"}]

  const handleChange = (e) => {
    setAge(e.target.value)
  }

  return (
    <Layout>
      <Select
        value={age}
        options={options}
        onChange={handleChange}
      >
      </Select>
    </Layout>
  )
}
```


```tsx
/**
 * title: 基本
 * desc: 基本使用
 */
import * as React from 'react';
        
import { Select, Layout } from 'fbm-ui'
import { MenuItem, FormControl, InputLabel} from '@mui/material'

export default () =>{
  const [age, setAge] = React.useState('')
  const options = [
    {
      label: '女',
      value: '1'
    },
    {
      label: '男',
      value: '2'
    }
  ]

  const handleChange = (e) => {
    setAge(e.target.value)
  }

  return (
    <Layout>
      <Select
        value={age}
        options={options}
        onChange={handleChange}
      >
      </Select>
    </Layout>
  )
}
```

```tsx
/**
 * title: samll
 * desc: 基本使用
 */
import * as React from 'react';
        
import { Select, Layout } from 'fbm-ui'
import { MenuItem, FormControl, InputLabel} from '@mui/material'

export default () =>{
  const [age, setAge] = React.useState('')
  const options = [
    {
      label: '女',
      value: '1'
    },
    {
      label: '男',
      value: '2'
    }
  ]

  const handleChange = (e) => {
    setAge(e.target.value)
  }

  return (
    <Layout>
      <Select
        size="small"
        value={age}
        options={options}
        onChange={handleChange}
      >
      </Select>
    </Layout>
  )
}
```

```tsx
/**
 * title: samll
 * desc: 基本使用
 */
import * as React from 'react';
        
import { Select, Layout } from 'fbm-ui'
import { MenuItem, FormControl, InputLabel} from '@mui/material'

export default () =>{
  const [age, setAge] = React.useState([])
  const options = [
    {
      label: '女',
      value: '1'
    },
    {
      label: '男',
      value: '2'
    }
  ]

  const handleChange = (e) => {
    setAge(e.target.value)
  }

  return (
    <Layout>
      <Select
        size="small"
        value={age}
        multiple={true}
        options={options}
        onChange={handleChange}
      >
      </Select>
    </Layout>
  )
}
```

<!-- 
<API></API> -->



