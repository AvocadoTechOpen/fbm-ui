import * as React from 'react';
import { TablePagination as MuiTablePagination, TablePaginationProps, tablePaginationClasses, menuItemClasses } from '@mui/material'


const Pagination: React.FC<TablePaginationProps> = (props) => {
  return <MuiTablePagination {...props} />
}

Pagination.defaultProps = {
  labelRowsPerPage: '每页展示行数',
  labelDisplayedRows: ({ from, to, count }) => {
    return `第${from}–${to}行，共${count !== -1 ? count : `more than ${to}`}行`;
  },
  SelectProps: {
    MenuProps: {
      MenuListProps: {
        sx: {
          width: '80px',
          [`& .${tablePaginationClasses.menuItem}.${menuItemClasses.selected}`]: {
            backgroundImage: `url(https://webcdn.fbmms.cn/assets/2_HD/Jnd3JRj-HcMkXaGe-CjA-) !important`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50px center',
            backgroundColor: 'transparent !important'
          },
          [`& .${tablePaginationClasses.menuItem}.${menuItemClasses.selected}:hover`]: {
            backgroundColor: 'rgba(76, 175, 80, 0.12) !important'
          },

          // [`& .${tablePaginationClasses.menuItem}.${menuItemClasses.selected}:hover`]: {
          //   backgroundColor: 'transparent'
          // }
        }
      }

    }
  }
}

export default Pagination