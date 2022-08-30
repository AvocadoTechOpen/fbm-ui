---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
---
# Progress 进度条
## 代码演示

```tsx
/**
 * title: CircularProgress
 * desc: 大小可通过size，默认尺寸44px
 */
import * as React from 'react';
import { Demo, CircularProgress, Box } from 'fbm-ui'

export default () => {
  return (
    <Demo>
      <Box display="flex">
        <Box>
          <CircularProgress size={'44px'} />
        </Box>
        <Box sx={{ml: 10}} >
          <CircularProgress size={'16px'} />
        </Box>
      </Box>
    </Demo>
  )
}
```

```tsx
/**
 * title: CircularProgress
 * desc: determinate设置
 */
import * as React from 'react';
import { Demo, CircularProgress, Box, Button } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState(10)
  return (
    <Demo>
      <Button sx={{mb: 3}} onClick={() => setValue( value+10  )}> +10 </Button>
      <Box display="flex">
        <Box>
          <CircularProgress variant="determinate" value={value} size={'44px'} />
        </Box>
        <Box sx={{ml: 10}} >
          <CircularProgress variant="determinate" value={value}  size={'16px'} />
        </Box>
      </Box>
    </Demo>
  )
}
```

```tsx
/**
 * title: LinearProgress
 * desc: 基本使用
 */
import * as React from 'react';
import { Demo, LinearProgress,  } from 'fbm-ui'

export default () => {
  return (
    <Demo>
      <LinearProgress />
    </Demo>
  )
}
```

```tsx
/**
 * title: LinearProgress
 * desc: determinate设置
 */
import * as React from 'react';
import { Demo, LinearProgress, Box, Button } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState(10)
  return (
    <Demo>
      <Button sx={{mb: 3}} onClick={() => setValue(value >= 100 ? 0 : value+10  )}> +10% </Button>
        <Box>
          <LinearProgress variant="determinate" value={value} size={'44px'} />
        </Box>
    </Demo>
  )
}
```

<API></API>