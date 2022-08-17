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
 * title: 基本使用
 */
import * as React from 'react';
import { Layout, rules, Button,  Autocomplete, Form, FormItem, useForm, Input, TextField } from 'fbm-ui'

export default () => {
  const [value, setValue] = React.useState()
  const top100Films = [
    { label: "The Shawshank Redemption", value: 1994,},
    { label: "The Godfather", value: 1972 },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
    { label: "12 Angry Men", value: 1957 },
    { label: "Schindler's List", value: 1993 },
  ];
  return (
    <Layout>
      <Autocomplete
        placeholder="请输入"
        value={value}
        options={top100Films}
        onChange={(e, value) => setValue(value)}
      />
      <br/><br/>
      <Autocomplete
        size="small"
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
    value: 1994,
  },
  { label: "The Godfather", value: 1972 },
  { label: "The Godfather: Part II", value: 1974 },
  { label: "The Dark Knight", value: 2008 },
  { label: "12 Angry Men", value: 1957 },
  { label: "Schindler's List", value: 1993 },
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
        limitTags={1}
      />
      <br/><br/>
      <Autocomplete
        multiple
        placeholder="请输入"
        value={value}
        size="small"
        options={top100Films}
        onChange={handleChange}
         limitTags={1}
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
    value: 1994,
  },
  { label: "The Godfather", value: 1972 },
  { label: "The Godfather: Part II", value: 1974 },
  { label: "The Dark Knight", value: 2008 },
  { label: "12 Angry Men", value: 1957 },
  { label: "Schindler's List", value: 1993 },
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
``` 


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
    value: 1994,
  },
  { label: "The Godfather", value: 1972 },
  { label: "The Godfather: Part II", value: 1974 },
  { label: "The Dark Knight", value: 2008 },
  { label: "12 Angry Men", value: 1957 },
  { label: "Schindler's List", value: 1993 },
];

  const handleChange = (e, value) => {
    setValue(value)
  }

  const formProps = useForm({
    initialValues: {
      keys: {},
      keys: []
    },
     onSubmit: (values) => {
    },
  })

  return (
    <Layout>
      <Form {...formProps}> 
        <FormItem name="key" label="单选" required>
          <Autocomplete
            placeholder="请输入"
            options={top100Films}
          />
        </FormItem>
        <FormItem name="keys" label="多选" required>
          <Autocomplete
            multiple
            placeholder="请输入"
            options={top100Films}
            disableCloseOnSelect={true}
          />
        </FormItem>
        <Input />
      </Form>
    </Layout>
  )
}
```
```tsx
/**
 * title: 扩展其他样式
 */
import * as React from "react";
import { Layout, Autocomplete, FormItem, Input, Chip, Checkbox, Typography, Box } from "fbm-ui";
import { ListSubheader, styled } from "@mui/material";

export default () => {
  const [value, setValue] = React.useState([]);
  const params = [
    {
      department_name: "three-112121",
      department_token: "XFrztsUtkWlpZtKFv4LgREMRXK",
      position_list: [
        {
          position_name: "three-1分部职位哈哈哈哈很好顶顶顶顶的的",
          position_token: "fNaYYNBbdwCzzWsg1m7UREMS3Y",
          refer_position_id: 0,
          refer_position_token: "",
          refer_department_id: 0,
          refer_department_name: "21312321",
          refer_department_token: "说的VCDSV但是dsfcds",
          is_shadow_position: 0,
        },
        {
          position_name: "three-都是错的撒川师大CAD是",
          position_token: "23e342321321vdscvdscd",
          refer_position_id: 0,
          refer_position_token: "",
          refer_department_id: 0,
          refer_department_name: "21312321",
          refer_department_token: "说的VCDSV但是dsfcds",
          is_shadow_position: 0,
        },
      ],
    },
    {
      department_name: "21321312",
      department_token: "12312321",
      position_list: [
        {
          position_name: "three-12312312321321",
          position_token: "dvsdvdfvdfvdf",
          refer_position_id: 0,
          refer_position_token: "",
          refer_department_id: 0,
          refer_department_name: "dfvfd",
          refer_department_token: "dsvcdscds",
          is_shadow_position: 0,
        },
        {
          position_name: "csdcsdcsdcds-d",
          position_token: "scdscsdcsdcsdc",
          refer_position_id: 0,
          refer_position_token: "",
          refer_department_id: 0,
          refer_department_name: "21312321",
          refer_department_token: "说的VCDSV但是dsfcds",
          is_shadow_position: 0,
        },
      ],
    },
  ];
  const data =
    params?.reduce(
      (p, c) => [
        ...p,
        ...c.position_list.map((v) => ({
          ...v,
          positionName: c.department_name,
          positionToken: c.department_token,
          name: v.position_name,
          token: v.position_token,
        })),
      ],
      []
    ) || [];

  const handleChange = (_, value) => {
    setValue(value);
  };

  return (
    <Layout>
      <FormItem label="应用步骤">
      <Autocomplete
        multiple
        size="large"
        disableCloseOnSelect
        options={data}
        value={value || []}
        groupBy={(option) => `${option?.positionName}--${option?.positionToken}`}
        renderGroup={(params) => {
          const groupName = params.group.replace(/--\w+/, "");
          return (
            <li key={params.key}>
              <ListSubheader component="div">{groupName}</ListSubheader>
              <div>{params.children}</div>
            </li>
          );
        }}
        isOptionEqualToValue={(option, value) =>
          option?.positionToken === value?.positionToken && option?.token === value?.token
        }
        getOptionLabel={(option) => option?.name}
        getGroupName={(option) => option?.name}
        getOptionDisabled={(option) => option?.hasTemplate && token !== option?.template?.token}
        onChange={(_, e) => handleChange(_, e)}
      />
      </FormItem>
    </Layout>
  );
};
```