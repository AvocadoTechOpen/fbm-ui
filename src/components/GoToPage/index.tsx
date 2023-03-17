import React, { useCallback, useState } from "react";
import { Stack } from "@mui/material";
import { Input, Message, Typography } from "..";

export interface IGoToPage {
  total: number;
  onChange: (page: number) => void;
}

const onSubmit = (rawValue, total, onChange) => {
  const value = +rawValue;
  if (rawValue === "") return;
  if (isNaN(value) || value < 1 || value > total) {
    Message.warning("请输入有效页数");
  } else {
    onChange(value);
  }
};

function GoToPage({ total, onChange }: IGoToPage) {
  const [page, setPage] = useState(null);

  const handleChange = useCallback((e) => {
    const value = e.currentTarget.value;
    setPage(value);
  }, []);

  const handleBlur = useCallback(() => {
    if (page == null) return;
    onSubmit(page, total, onChange);
  }, [page, total, onChange]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode !== 13 || page == null) return;
      onSubmit(page, total, onChange);
    },
    [page, total, onChange]
  );

  return (
    <Stack direction="row" spacing={1} alignItems="center" flexShrink={0}>
      <Typography variant="body2">跳至</Typography>
      <Input
        type="number"
        size="small"
        sx={{ width: 60 }}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <Typography variant="body2">页</Typography>
    </Stack>
  );
}

export default GoToPage;
