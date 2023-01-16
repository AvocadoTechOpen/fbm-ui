---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---

# DatePicker

## 代码演示

```tsx
/**
 * title: 基本
 * desc: 基本使用
 */
import * as React from "react";
import { Demo, Typography, DatePicker, TextField, useTextField } from "fbm-ui";

export default () => {
  const [value, setValue] = React.useState(null);

  const handleChange = (event) => {
    setValue(event);
  };

  const dateFieldProps = useTextField({
    value,
    rules: [{ required: true }, { type: "date" }],
    onChange: handleChange,
    InputProps: {
      label: "日历",
    },
  });

  return (
    <Demo>
      <TextField label="日历" error={dateFieldProps.error}>
        <DatePicker {...dateFieldProps.InputProps} />
      </TextField>
    </Demo>
  );
};
```

# DatePicker

## 代码演示

```tsx
/**
 * title: 基本
 * desc: 基本使用
 */
import * as React from "react";
import { Demo, Typography, DatePicker, TextField, useTextField } from "fbm-ui";

export default () => {
  const [value, setValue] = React.useState(null);

  const handleChange = (event) => {
    setValue(event);
  };

  const dateFieldProps = useTextField({
    value,
    rules: [{ required: true }, { type: "date" }],
    onChange: handleChange,
    InputProps: {
      disabled: true,
      InputProps: {
        size: "small",
      },
    },
  });

  return (
    <Demo>
      <TextField size="small" label="日历" error={dateFieldProps.error}>
        <DatePicker {...dateFieldProps.InputProps} />
      </TextField>
    </Demo>
  );
};
```
