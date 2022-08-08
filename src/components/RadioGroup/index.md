---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---
# RadioGroup 单选组
## 代码演示

```jsx
/**
 * title: 基本 横排展示
 */
import * as React from 'react';
import { 
  RadioGroup,
  Radio,
  Demo,
} from 'fbm-ui'

export default () => {

  const handleChange = (e) => {
    console.log(e.target.value)
  }
  return (
    <Demo>
      <RadioGroup onChange={handleChange} value={'A'} row={false}>
        <Radio value={'A'} label="A" disabled/>
        <Radio value={'B'} label="B"/>
        <Radio value={'C'} label="C"/>
        <Radio value={'D'} label="D"/>
      </RadioGroup>
    </Demo>
  )
}
```

```jsx
/**
 * title: 基本 竖排展示
 */
import * as React from 'react';
import { 
  RadioGroup,
  Radio,
  Demo,
} from 'fbm-ui'

export default () => {
  return (
    <Demo>
      <RadioGroup>
        <Radio value={'A'} label="A"/>
        <Radio value={'B'} label="B"/>
        <Radio value={'C'} label="C"/>
        <Radio value={'D'} label="D"/>
      </RadioGroup>
    </Demo>
  )
}
```