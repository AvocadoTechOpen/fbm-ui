---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---
# Form 表单
## 代码演示

```jsx
/**
 * title: 基本
 */
import * as React from 'react';
import { 
  Layout,
  Input,
  Form, 
  FormItem,
  Button,
  Select, 
  useForm,
  DatePicker,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Demo,
} from 'fbm-ui'

export default () => {
  const form = useForm({
   
    initialValues: {
      name:'',
      sex: '',
      type: 1,
      keys: [],
      radio: '',
      isProgress: false,
    },
    onSubmit: (values) => {
    },
  })

  const options = [
    {
      label: '女',
      value: 1
    },
    {
      label: '男',
      value: 2
    }
  ]

  const handleChange = (e) => {
    console.log('----')
  }

  return (
    <Layout>
      <Demo grey>
        {JSON.stringify(form.values)}
      </Demo>
    
      <Form {...form}>
        <FormItem
          label="名称"
          required
          size="small"
          name='name'
          trigger="onChange"
          max={10}
          InputProps={{ autoFocus: true }}
        />
      </Form>
      
      <Button onClick={form.handleReset} variant="outlined" sx={{ mr:1 }}>
          重置
      </Button>
      <Button onClick={form.handleSubmit}>
        提交
      </Button>
    </Layout>
  )

}
```