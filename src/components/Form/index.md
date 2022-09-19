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
      radios: 1964,
      keys: [],
      radio: '',
      isProgress: false,
    },
    onSubmit: (values) => {
    },
  })

  const mockOptions = [
    {
      label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      value: 1964,
    },
    { label: 'The Great Dictator', value: 1940 },
    { label: 'The Lives of Others', value: 2006 },
    { label: 'Grave of the Fireflies', value: 1988 },
    { label: 'Paths of Glory', value: 1957 },
    { label: 'Django Unchained', value: 2012 },
    { label: 'The Shining', value: 1980 },
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
          label='名称'
          required
          name='name'
          max={10}
        />
        <FormItem
          label='性别'
          name='sex'
          required
          options={mockOptions}
        />
        <FormItem 
          name='radios' 
          sx={{ height: 'auto'}}
        >
          <RadioGroup row={false} onChange={handleChange} options={mockOptions} />
        </FormItem>
      </Form>
      
      <Button onClick={form.handleReset} variant='outlined' sx={{ mr:1 }}>
          重置
      </Button>
      <Button onClick={form.handleSubmit}>
        提交
      </Button>
    </Layout>
  )

}
```