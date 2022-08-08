---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---

# Autocomplete 带验证的输入框
## 代码演示


```tsx
/**
 * title: 单选
 */
import * as React from 'react';
import { Layout, rules, Button, SearchIcon, Autocomplete, Form, FormItem, useForm, Input, TextField } from 'fbm-ui'
import {
    CheckBoxItem,
    AutocompleteContainer,
    AutocompleteTextField,
    PopperComponent,
    AutocompleteChip,
} from "./index.styles";

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

  const handleSubmit = () => {
  }

  const form = useForm({
    initialValues: {
      keys: [],
    },
    onSubmit: (values) => {
    },
  })

  return (
    <Layout>
      <TextField label="啊啥的">
        <Autocomplete
          placeholder="请输入"
          value={value}
          options={top100Films}
          onChange={(e, value) => setValue(value)}
        />
      </TextField>
    </Layout>
  )
}

```

```tsx
/**
 * title: 多选
 */
import * as React from 'react';
import { Layout, rules, Button, SearchIcon, Autocomplete, Form, FormItem, useForm, Input } from 'fbm-ui'
import {
    CheckBoxItem,
    AutocompleteContainer,
    AutocompleteTextField,
    PopperComponent,
    AutocompleteChip,
} from "./index.styles";
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

  const handleSubmit = () => {
  }

  const form = useForm({
    initialValues: {
      keys: [],
    },
    onSubmit: (values) => {
    },
  })

  return (
    <Layout>
      <Autocomplete
        multiple
        placeholder="请输入"
        value={value}
        options={top100Films}
        onChange={(e, value) => setValue(value)}
      />
    </Layout>
  )
}

```