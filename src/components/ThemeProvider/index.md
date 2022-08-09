---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
---
# ThemeProvider 主题
## 代码演示

```tsx
/**
 * title: 主题
 * desc: 基本使用
 */
import * as React from 'react';
import { Button, Input, ThemeProvider, theme} from 'fbm-ui'

// const { palette } = theme

export default () =>{
  const [color, setColor] = React.useState('#000')


  return (
    <div>
     <input type="color" onChange={(e) => setColor(e.target.value)}/>
     <br />
     <ThemeProvider palette={{
        primary: {
          main: color
        }
      }}>
         <Button sx={{mr: 1}} >按钮</Button> 
        <Button sx={{mr: 1}} variant="text">按钮</Button> 
        <Button sx={{mr: 1}} variant="outlined">按钮</Button> 
        <ThemeProvider palette={{
            primary: {
              main: '#000'
            }
        }}>
          <Input />
        </ThemeProvider>
      </ThemeProvider>
    </div>
  )
}
```

