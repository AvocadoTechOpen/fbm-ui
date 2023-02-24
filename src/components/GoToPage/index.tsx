import { Stack } from "@mui/material";
import React, { useCallback } from "react";
import { debounce } from 'lodash-es';
import { Input, Message, Typography } from "..";

export interface IGoToPage {
  total: number;
  onChange: (page: number) => void;
}

const debouncedChange = debounce((rawValue, total, onChange) => {
  const value = +rawValue;
  if (rawValue === '') return;
  if (isNaN(value) || value < 1  || value > total) {
    Message.warning('请输入有效页数');
  } else {
    onChange(value);
  }
}, 500);

function GoToPage({ total, onChange }: IGoToPage) {
  const handleChange = useCallback((e) => {
    const value = e.currentTarget.value;
    debouncedChange(value, total, onChange)
  }, [total, onChange]);

  return (
    <Stack direction="row" spacing={1} alignItems="center" flexShrink={0}>
      <Typography variant="body2">跳至</Typography>
      <Input
        type="number"
        size="small"
        sx={{ width: 60 }}
        onChange={handleChange}
      />
      <Typography variant="body2">页</Typography>
    </Stack>
  );
}

export default GoToPage;
