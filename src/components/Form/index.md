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
  DatePicker
} from 'fbm-ui'

// 测试性能
const KEYS =  {'a':'' ,'b':'', 'c': '', 'd':'', 'e':'', 'r':'', 't':'', 'y':'', 'u':'', 'i':'', 'p':'', 'x':'', 'v':'', 'n':'', 'm':'', 'z': ''}

export default () => {
  const form = useForm({
    initialValues: {
      name:'',
      sex: 2,
      email: '',
      date: null,
      password: '',
      rePassword: '',
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <Layout>
      <Form {...form}>
        <FormItem
          required
          name='name' 
          label="名称"
          max={20}
         />
        
        <FormItem
          name="date"
          type="date"
          label="日期"
          required
          rules={[
            {
              type: 'date'
            }
          ]}
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