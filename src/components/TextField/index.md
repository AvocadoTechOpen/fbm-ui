---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---

# TextField 包含label和helperText
## 代码演示

```tsx
/**
 * title: 基本
 * desc: 两种尺寸大小，分别是高度48px（默认）和36px（small）
 */
import * as React from 'react';
import { Layout, TextField,  useTextField, Button } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState('')
  return (
    <Layout>
      <TextField 
        label="默认尺寸"
        onChange={(e) => setValue(e.target.value) } 
        value={value} 
      />
      <br/>
      <TextField 
        label="small"
        size="small" 
      />
    </Layout>
  )
}
```

```tsx
/**
 * title: Input单纯的输入框组件
 * desc: 不需要label和helperText（提示文案报错文案）
 */
import * as React from 'react';
import { Layout, Input } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState('')
  return (
    <Layout>
      <Input 
        onChange={(e) => setValue(e.target.value) } 
        value={value} 
      />
      <br/>
      <br/>
      <Input 
        size="small" 
      />
    </Layout>
  )
}
```


```tsx
/**
 * title: useTextField
 * desc: 使用useTextField为TextField组件添加验证方法
 */
import * as React from 'react';
import { Layout, TextField,  useTextField, Button } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState('')

 const nameFieldProps = useTextField({
    label: '姓名',
    size: 'small',
    max: 5,
    rules: [{
      // 必填
      required: true,
    }],
    onChange: (event) => {
      setValue(event.target.value)
    },
  })

  const handleSubmit = async () => {
    const error:string = await nameFieldProps.handleValidate()
  }

  return (
    <Layout>
      <TextField  size="small" { ...nameFieldProps } />
      <Button onClick={handleSubmit}> 提交 </Button> 
    </Layout>
  )
}
```

```tsx
/**
 * title: Select
 * desc: 基本使用
 */
import * as React from 'react';
import { Layout, TextField, rules, useTextField, Button, SearchIcon, DatePicker, Select } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState('eq')

   const options = [
    { label: "等于", value: "eq" },
    { label: "不等于", value: "notEq" },
    { label: "包含", value: "contains" },
    { label: "不包含", value: "notContains" },
    { label: "为空", value: "isNull" },
    { label: "不为空", value: "notNull" },
  ];

  return (
    <Layout>
      <TextField label="高级筛选" options={options} />
    </Layout>
  )
}
```

```tsx
/**
 * title: standard
 * desc: 基本使用
 */
import * as React from 'react';
import { Demo, TextField, rules, useTextField, Button, SearchIcon} from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState('')
  const ref = React.useRef(null)
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const nameFieldProps = useTextField({
    value,
    max: 5,
    onChange: handleChange,
    rules: [rules.required()],
    variant: 'standard',
    onClear: () => {
      setValue('')
    },
  })

  const handleSubmit = async () => {
    nameFieldProps.handleValidate()
  }

  return (
    <Demo white={true}>
      <TextField
        size="small"
        {...nameFieldProps}
      />
      <Button onClick={handleSubmit}> 提交 </Button> 
    </Demo>
  )
}

```

```tsx
/**
 * title: textarea
 * desc: 基本使用
 */
import * as React from 'react';
import { Demo, TextField, rules, useTextField, Button, SearchIcon} from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState('')
  const ref = React.useRef(null)
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const nameFieldProps = useTextField({
    value,
    rules: [rules.required()],
    onChange: handleChange,
    sx: {
      height: 'auto',
    },
    InputProps: {
      rows:3 ,
      placeholder: '内容',
      multiline: true,
      inputProps: {
      }
    }
  })

  const handleSubmit = async () => {
    nameFieldProps.handleValidate()
  }

  return (
    <Demo white={true}>
      <TextField
        {...nameFieldProps}
      />
      <Button onClick={handleSubmit}> 提交 </Button> 
    </Demo>
  )
}

```


```tsx
/**
 * title: 类组件使用TextField
 * desc: 如果校验规则想使用组件的校验规则即useTextField 需要配合useImperativeHandle调用子组件方法
 */
import * as React from 'react';
import { Demo, TextField, rules, useTextField, Button, SearchIcon} from 'fbm-ui'
import { InputProps } from '../Input';

class DemoForTextField extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    }
    this.exampleRef = React.createRef();
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }
  
  handleSubmit = async () => {
    const isError = await this.exampleRef.current.validate();
    // todo
  };

  render() {
    return (
    <Demo white={true}>
      <Example
        ref={this.exampleRef}
        onChange={this.onChange}
        value={this.state.value}
      />
      <Button onClick={this.handleSubmit}> 提交 </Button> 
    </Demo>
    )
  }
}
export default DemoForTextField;

interface ExampleProps {
  onChange: InputProps['onChange'],
  value: string,
}
const Example: React.FC<ExampleProps> = React.forwardRef(({ 
  onChange,
  value,
 }, ref) => {

  const nameFieldProps = useTextField({
    value,
    onChange: (e) => onChange(e),
    rules: [rules.required()],
  })

  React.useImperativeHandle(ref, () => {
     return {
       validate() {
         return nameFieldProps.handleValidate();
       }
     }
  });

  return (
    <TextField
      {...nameFieldProps}
    />
  );
})
```

```tsx
/**
 * title: 两种大小
 * desc: 输入框定义了两种尺寸（默认、小），高度分别为36px和48px。
 */
import * as React from 'react';
import {  Demo, Input, Box} from 'fbm-ui'

export default () => (
  <Demo grey={true}>
    <Box sx={{ mb: 2 }}>
      <Input size="small" placeholder="请输入姓名"  />
    </Box>
    <Box>
      <Input placeholder="请输入姓名"  />
    </Box>
  </Demo>
)
```

```tsx
/**
 * desc: startAdornment
 */
import * as React from 'react';
import {  Demo, Input, Box, SearchIcon} from 'fbm-ui'

export default () => (
  <Demo>
    <Input 
     
      startAdornment={
        <SearchIcon color="disabled" />
      }
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


```tsx
/**
 * title: 输入校验
 * desc: 校验是实时校验,暂时提供的校验规则有手机号，邮箱和必填项(required, mobile, email), 也可自定义校验
 */
import * as React from 'react';
import { Demo, TextField, rules, useTextField, Button, SearchIcon} from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState('')
  
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const nameFieldProps = useTextField({
    value,
    rules: [rules.required(), rules.mobile('手机号不正确'), () => {
      // 此处为自定义校验
      // 若返回undefined 则表示校验通过 返回其他内容则作为提示给用户
      return '输入不正确';
    }],
    onChange: handleChange,
    inputProps: {
      placeholder: '内容',
    }
  })

  const handleSubmit = async () => {
    // handleValidate 会将rules的校验再次校验一次 返回值为一个promise（永远为resolve状态）多个useTextField使用可以使用Promise.all（但是建议使用Form）
    const isError = await nameFieldProps.handleValidate();
  }

  return (
    <Demo white={true}>
      <TextField
        {...nameFieldProps}
      />
      <Button onClick={handleSubmit}> 提交 </Button> 
    </Demo>
  )
}

```
