---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---
# Checkbox 复选框
## 代码演示

```jsx
/**
 * title: 基本 横排展示
 */
import * as React from 'react';
import { 
  Checkbox,
  Demo,
} from 'fbm-ui'

export default () => {

  return (
    <Demo>
        <Checkbox value={'A'} label="A" onChange={(e) =>  console.log(e.target.value) }/>
        <Checkbox value={'B'} label="B"/>
        <Checkbox value={'C'} label="C"/>
        <Checkbox value={'D'} label="D"/>
    </Demo>
  )
}
```

```jsx
/**
 * title: 基本 横排展示 禁用状态
 */
import * as React from 'react';
import { 
  Checkbox,
  Demo,
} from 'fbm-ui'

export default () => {

  return (
    <Demo>
        <Checkbox value={'A'} label="A" disabled checked/>
        <Checkbox value={'B'} label="B" disabled />
        <Checkbox value={'C'} label="C"/>
        <Checkbox value={'D'} label="D"/>
    </Demo>
  )
}
```


```jsx
/**
 * title: 复选框组
 */
import * as React from 'react';
import { 
  Checkbox,
  Demo,
} from 'fbm-ui'

export default () => {

  return (
    <Demo>
        <Checkbox value={'A'} label="A" disabled checked/>
        <Checkbox value={'B'} label="B" disabled />
        <Checkbox value={'C'} label="C"/>
        <Checkbox value={'D'} label="D"/>
    </Demo>
  )
}
```
