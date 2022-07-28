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
 * title: 基本
 * desc: 基本使用
 */
import * as React from 'react';
import { Layout, rules, Button, SearchIcon, TextField, useInput, Autocomplete} from 'fbm-ui'
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
    children: [
      { label: "12312", token: 19993 },
      { label: "sdcsdacadscdsc", token: 19991 },
      { label: "1231dsnjnkjnkjnkj2", token: 19992 },
      { label: "123dsfdcsxtr4312", token: 19993 },
    ],
  },
  { label: "The Shawshank Redemption", token: 19943 },
  { label: "The Godfather", token: 1972 },
  { label: "The Godfather: Part II", token: 1974 },
  { label: "The Dark Knight", token: 2008 },
  { label: "12 Angry Men", token: 1957 },
  { label: "Schindler's List", token: 1993 },
];

  // const { 
  //   error,
  //   value,
  //   setValue,
  // } = useInput({
  //   value,
  //   rules: [{ required: true }]
  // })

  const handleSubmit = () => {
  }

  return (
    <Layout>
      <Autocomplete
        data={top100Films}
        // open
        value={value}
        multiple={true}
        options={top100Films}
        onChange={(_, newValue) => {
          setValue(newValue)
        }}
        type="check"
        isOptionEqualToValue={(option, val) => option.token === val.token}

        disableCloseOnSelect
        renderInput={(params) => {
          return (
            <TextField
            size="small" placeholder="请输入"  
              {...params}
            />
          )
        }}
      />
    </Layout>
  )
}

```