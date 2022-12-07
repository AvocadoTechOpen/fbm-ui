---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---

#  TimePicker 时间组件 TODO
## 代码演示

```tsx
/**
 * title: 基本
 * desc: 基本使用
 */
import * as React from 'react';
import { Demo, TimePicker, useForm, Form, FormItem, Button } from 'fbm-ui'

export default () => {
  const form = useForm({
    initialValues: {
      startTime: null,
    },
    onSubmit: async (values) => {
      console.log('TimePicker form:', values);
    }
  })

  async function handleClick() {
    await form.submitForm();
  }

  return (
      <Demo>
        <Form {...form}>        
          <FormItem name="startTime" label="开始时间" required>
            <TimePicker />
          </FormItem>
          <Button onClick={handleClick}>提交</Button>
        </Form>
      </Demo>
    )
  }
```