---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---
# Input 输入框
## 代码演示

```tsx
/**
 * title: 两种大小
 * desc: 输入框定义了两种尺寸（默认、小），高度分别为36px和48px。
 */
import * as React from 'react';
import {  Demo, Input, Box, SearchIcon } from 'fbm-ui'
import { InputAdornment } from '@mui/material'

export default () => (
  <Demo grey={true}>
    <Box sx={{ mb: 2 }}>
      <Input size="small" placeholder="请输入姓名"  />
    </Box>
    <Box>
      <Input placeholder="请输入姓名" />
    </Box>
  </Demo>
)
```

```tsx
/**
 * desc: disabled
 */
import * as React from 'react';
import {  Demo, Input, Box } from 'fbm-ui'

export default () => (
  <Demo>
    <Input disabled placeholder="请输入姓名" />
  </Demo>
)
```

```tsx
/**
 * title: 修饰输入框
 * desc: startAdornment and endAdornment
 */
import * as React from 'react';
import {  Demo, Input, Box, SearchIcon, CloseIcon, IconButton, InputAdornment } from 'fbm-ui'

export default () => (
  <Demo>
    <Input 
      startAdornment={<InputAdornment position="start">kg</InputAdornment>}
      endAdornment={'%'}
      placeholder="请输入姓名"
     />
  </Demo>
)
```


```tsx
/**
 * desc: StandardInput
 */
import * as React from 'react';
import {  Demo, Input, Box } from 'fbm-ui'

export default () => (
  <Demo white>
    <Input variant='standard'  placeholder="请输入姓名" />
  </Demo>
)
```



<API></API>