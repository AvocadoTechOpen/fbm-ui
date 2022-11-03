import * as React from 'react';
import { Pagination as MuiPagination, PaginationProps as MuiPaginationProps } from '@mui/material'

export interface PaginationProps extends MuiPaginationProps { }

const Pagination: React.FC<PaginationProps> = (props) => {
  return <MuiPagination {...props} />
}

Pagination.defaultProps = {
  color: 'primary'
}

export default Pagination