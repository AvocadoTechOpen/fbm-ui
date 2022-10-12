---
nav:
  title: 组件
  path: /components
group:
  title: 通用
---
# Pagination 分页
## 代码演示



```tsx
/**
 * title: 基本
 * desc: 基本使用
 */
import * as React from 'react';
import { Pagination, Demo } from 'fbm-ui'

export default () => {
  return (
    <Demo>
      <Pagination count={100} />
    </Demo>
  )
}

```


```tsx
/**
 * title: 表格分页
 * desc: 基本使用
 */
import * as React from 'react';
import { TablePagination, Demo } from 'fbm-ui'

export default () => {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Demo white>
      <TablePagination 
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Demo>
  )
}

```