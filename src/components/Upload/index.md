---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---
# Upload 上传组件
## 代码演示

```tsx
/**
 * title: Dnd 类型 - 单个文件
 */
import * as React from 'react';
import { Demo, Upload, Box } from 'fbm-ui'

export default () => {
  const props = {
    type: 'drop',
    name: 'file',
    multiple: false,
    showUploadList: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  };
  return (
    <Demo white>
      <Box maxWidth={380}>
        <Upload  {...props} />
      </Box>
    </Demo>
  )
}
```

```tsx
/**
 * title: Dnd 类型 - 多个文件
 */
import * as React from 'react';
import { Demo, Upload, Box } from 'fbm-ui'

export default () => {
  const props = {
    type: 'drop',
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  };
  return (
    <Demo white>
      <Box maxWidth={380}>
        <Upload  {...props} />
      </Box>
    </Demo>
  )
}
```

```tsx
/**
 * title: Cube 类型
 */
import * as React from 'react';
import { Demo, Upload } from 'fbm-ui'
import { Stack } from '@mui/material';

export default () => {
  const props = {
    type: 'cube',
    name: 'file',
    multiple: false,
    showUploadList: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  };
  return (
    <Demo white>
      <Stack maxWidth={380} direction="row" spacing={1}>
        <Upload {...props} />
        <Upload {...props} width={257} />
      </Stack>
    </Demo>
  )
}
```

<API></API>

