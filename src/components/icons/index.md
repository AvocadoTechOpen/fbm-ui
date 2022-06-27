---
nav:
  title: 组件
  path: /components
group:
  title: 通用
---
# Icon 图标
## 代码演示

```tsx
import * as React from 'react';
import {  Layout, Typography, Message, Actions }  from 'fbm-ui'
import { Grid, Paper } from '@mui/material'
import toCopy from "copy-to-clipboard";

import  * as icons from './index'

const itemStyle = {
  textAlign: 'center',
  padding: '10px',
  opacity: 0.8,
  
  '&:hover': {
    opacity: 1,
  },
}


export default () => {

  const [iconType, setIconType] = React.useState('')
  
  const handleCopy = (displayName) => {
    const content = `<${displayName} />`
    const msg = `${content} copied`;
    toCopy(content)
    Message.success(msg)
  }

  const mapIcon = Object.keys(icons)
  .filter((name) => {
    if (iconType === '' ) return true

    return name.toLowerCase().includes(iconType)
  })
  .map((name, index) => {
    const Icon = icons[name]
    return (
      <Grid
        style={{ cursor: "pointer" }}
        item
        key={name}
        xs={2}
        onClick={() => handleCopy(name)}
      >
        <Paper sx={itemStyle}>
          <Icon style={{ fontSize: 36 }} />
          <Typography style={{ wordBreak: "break-all" }}>
            {name}
          </Typography>
        </Paper>
      </Grid>
    )
  })

  const actions = [
    {
      text: '全部',
      onClick: () => setIconType('')
    },
    {
      text: 'FilledIcon',
      onClick: () => setIconType('filled')
    },
    {
      text: 'OutlineIcon',
      onClick: () => setIconType('outline')
    },
  ]

  return (
    <Layout>
      <Actions actions={actions} spacing={6} />
      <Grid sx={{ mt: 1 }} container spacing={6}>
          {mapIcon}
      </Grid>
    </Layout>
  )
}
```
