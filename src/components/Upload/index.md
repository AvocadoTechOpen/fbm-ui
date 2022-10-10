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
 * title: drop类型
 */
import * as React from 'react';
import { Demo, Upload, Box } from 'fbm-ui'

export default () => {
  const props = {
    type: 'drop',
    accept:'image/*',
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
 * title: 多个文件
 */
import * as React from 'react';
import { Demo, Upload, Box,  } from 'fbm-ui'

export default () => {
  const beforeUpload = (file, fileList) => {
    return false
  }
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  };
  const ref = React.useRef(null);

  return (
    <Demo white>
      <Box maxWidth={380}>
        <Upload  {...props}  ref={ref} > 上传</Upload>
      </Box>
    </Demo>
  )
}
```


```tsx
/**
 * title: 图片列表
 */
import * as React from 'react';
import { Demo, Upload, Box,  } from 'fbm-ui'

export default () => {
  const beforeUpload = (file, fileList) => {
    return false
  }
  const props = {
    name: 'file',
    accept:'image/*',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    UploadListProps: {
      iconType: 'image'
    }
  };
  const ref = React.useRef(null);

  return (
    <Demo white>
      <Box maxWidth={380}>
          <Upload  {...props}  ref={ref} > 上传</Upload>
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
    accept:'image/*',
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

