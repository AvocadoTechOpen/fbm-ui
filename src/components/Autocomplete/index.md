---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---

# Autocomplete 带验证的输入框
## 代码演示


<!-- ```tsx
/**
 * title: 基本使用
 */
import * as React from 'react';
import { Layout, rules, Button,  Autocomplete, Form, FormItem, useForm, Input, TextField } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState()
  const top100Films = [
    { label: "The Shawshank Redemption", token: 1994,},
    { label: "The Godfather", token: 1972 },
    { label: "The Godfather: Part II", token: 1974 },
    { label: "The Dark Knight", token: 2008 },
    { label: "12 Angry Men", token: 1957 },
    { label: "Schindler's List", token: 1993 },
  ];
  return (
    <Layout>
      <Autocomplete
        placeholder="请输入"
        value={value}
        options={top100Films}
        onChange={(e, value) => setValue(value)}
      />
    </Layout>
  )
}
```

```tsx
/**
 * title: 多选
 */
import * as React from 'react';
import { Layout, rules, Button,  Autocomplete, Form, FormItem, useForm, Input } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState([])
  const top100Films = [
  {
    label: "The Shawshank Redemption",
    token: 1994,
  },
  { label: "The Godfather", token: 1972 },
  { label: "The Godfather: Part II", token: 1974 },
  { label: "The Dark Knight", token: 2008 },
  { label: "12 Angry Men", token: 1957 },
  { label: "Schindler's List", token: 1993 },
];

  const handleChange = (e, value) => {
    setValue(value)
  }

  return (
    <Layout>
      <Autocomplete
        multiple
        placeholder="请输入"
        value={value}
        options={top100Films}
        onChange={handleChange}
      />
    </Layout>
  )
}
```



```tsx
/**
 * title: 添加label
 */
import * as React from 'react';
import { Layout, rules, Button, Autocomplete, Form, FormItem, useForm, Input } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState([])
  const top100Films = [
  {
    label: "The Shawshank Redemption",
    token: 1994,
  },
  { label: "The Godfather", token: 1972 },
  { label: "The Godfather: Part II", token: 1974 },
  { label: "The Dark Knight", token: 2008 },
  { label: "12 Angry Men", token: 1957 },
  { label: "Schindler's List", token: 1993 },
];

  const handleChange = (e, value) => {
    setValue(value)
  }

  return (
    <Layout>
      <FormItem label="这是一个label">
        <Autocomplete
          multiple
          placeholder="请输入"
          value={value}
          options={top100Films}
          onChange={handleChange}
        />
      </FormItem>
    </Layout>
  )
}
``` -->



```tsx
/**
 * title: 结合form
 */
import * as React from 'react';
import { Layout,  Button, Autocomplete, Form, FormItem, useForm, Input } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState([])
  const top100Films = [
  {
    label: "The Shawshank Redemption",
    token: 1994,
  },
  { label: "The Godfather", token: 1972 },
  { label: "The Godfather: Part II", token: 1974 },
  { label: "The Dark Knight", token: 2008 },
  { label: "12 Angry Men", token: 1957 },
  { label: "Schindler's List", token: 1993 },
];

  const handleChange = (e, value) => {
    setValue(value)
  }

  const formProps = useForm({
    initialValues: {
      keys: [],
    },
     onSubmit: (values) => {
    },
  })

  return (
    <Layout>
      <Form {...formProps}> 
        <FormItem name="keys" label="这是一个label" required>
          <Autocomplete
            placeholder="请输入"
            options={top100Films}
          />
        </FormItem>
      </Form>
    </Layout>
  )
}
```