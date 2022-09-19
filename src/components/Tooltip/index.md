---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
---
# Tooltip 便签
## 代码演示

```tsx
/**
 * title: 基本使用
 */
import * as React from 'react';
import { Demo,  Tooltip, Grid, Box } from 'fbm-ui'

function Span({children}) {
 return (
    <span style={{padding: 10}}>{children}</span>
  )
}

export default () => {

  return (
    <Demo white elevation={2}>
        <Box sx={{ width: '600px' }}>
          <Grid container justifyContent="center">
        <Grid item>
          <Tooltip title="便签内容" placement="top-start">
            <span>top-start</span>
          </Tooltip>
          <Tooltip title="便签内容" placement="top">
            <span style={{padding:'0 10px'}}>top</span>
          </Tooltip>
          <Tooltip title="便签内容" placement="top-end">
            <span>top-end</span>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <Tooltip title="便签内容" placement="left-start">
            <span>left-start</span>
          </Tooltip>
          <br />
          <Tooltip title="便签内容" placement="left">
            <span>left</span>
          </Tooltip>
          <br />
          <Tooltip title="便签内容" placement="left-end">
            <span>left-end</span>
          </Tooltip>
        </Grid>
        <Grid item container xs={6} alignItems="flex-end" direction="column">
          <Grid item>
            <Tooltip title="便签内容" placement="right-start">
              <span>right-start</span>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="便签内容" placement="right">
              <span>right</span>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="便签内容" placement="right-end">
              <span>right-end</span>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item>
          <Tooltip title="便签内容" placement="bottom-start">
            <span>bottom-start</span>
          </Tooltip>
          <Tooltip title="便签内容" placement="bottom">
            <span style={{padding: 10}}>bottom</span>
          </Tooltip>
          <Tooltip title="便签内容" placement="bottom-end">
            <span>bottom-end</span>
          </Tooltip>
        </Grid>
      </Grid>
        </Box>
    </Demo>
  )
}
```

<API></API>