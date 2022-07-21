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
          max={10}
        >
          <Input  onChange={handleChange}/>
        </FormItem>
    
        <FormItem
          required
          name='sex' 
          label="性别"
       >
        <Select options={options} />
       </FormItem>
       
        <FormItem name='keys' required >
          <CheckboxGroup>
            <Checkbox value={'A'} label="A"/>
            <Checkbox value={'B'} label="B"/>
            <Checkbox value={'C'} label="C"/>
            <Checkbox value={'D'} label="D"/>
          </CheckboxGroup>
        </FormItem>
        <FormItem name="isProgress"  >
           <Checkbox label={'Progress'} />
        </FormItem>
        <FormItem name='radio' required>
          <RadioGroup>
            <Radio value={'A'} label="A"/>
            <Radio value={'B'} label="B"/>
            <Radio value={'C'} label="C"/>
            <Radio value={'D'} label="D"/>
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