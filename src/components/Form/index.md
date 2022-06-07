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
  DateRangePicker,
  Select, 
  rules,
  useForm,
  DatePicker,
  RadioGroup,
  Radio,
} from 'fbm-ui'

// 测试性能
const KEYS =  {'a':'' ,'b':'', 'c': '', 'd':'', 'e':'', 'r':'', 't':'', 'y':'', 'u':'', 'i':'', 'p':'', 'x':'', 'v':'', 'n':'', 'm':'', 'z': ''}

export default () => {
  const form = useForm({
    initialValues: {
      name:'',
      sex: '',
      type: 1,
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  console.log(form.values)

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

  return (
    <Layout>
      <Form {...form}>
        <FormItem
          required
          name='name' 
          label="名称"
          max={10}
         />

        <FormItem
          required
          name='sex' 
          label="性别"
        >
          <Select options={options} />
        </FormItem>
        
         <FormItem
          name='type' 
        >
          <RadioGroup>
              <Radio value={1} label="A"/>
              <Radio value={2} label="B"/>
              <Radio value={3} label="C"/>
              <Radio value={4} label="D"/>
          </RadioGroup>
        </FormItem>
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