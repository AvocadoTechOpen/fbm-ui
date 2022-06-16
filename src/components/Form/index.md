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
      isProgress: false,
    },
    onSubmit: (values) => {
      console.log(values)
    }
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

  return (
    <Layout>
    <Demo grey>
      {JSON.stringify(form.values)}
    </Demo>
      <Form {...form}>
        <FormItem
          required
          name='name' 
          label="名称"
          size='small'
          max={10}
         />

        <FormItem
          required
          name='sex' 
          label="性别"
          size='small'
          options={options}
       />
        <FormItem name='keys' required>
          <CheckboxGroup>
            <Checkbox value={'A'} label="A"/>
            <Checkbox value={'B'} label="B"/>
            <Checkbox value={'C'} label="C"/>
            <Checkbox value={'D'} label="D"/>
          </CheckboxGroup>
        </FormItem>
        <FormItem name="isProgress"  >
           <Checkbox label={'显示进度条'}/>
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