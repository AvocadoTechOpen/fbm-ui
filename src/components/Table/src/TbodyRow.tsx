import React from 'react';

import styled from '@mui/material/styles/styled'
import { TableRow } from '@mui/material'

interface TbodyRowProps {
  index: number,
  onClick?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
}

const TableRowRoot: React.FC<TbodyRowProps> = styled(TableRow)(({ index,onClick }: TbodyRowProps) => {
  return {
    position: 'relative',
    cursor: onClick ? "pointer" :"default",
    '&:hover': {
      backgroundColor: '#f4f4f4'
    },
    backgroundColor: index % 2 === 0 ? '#fff' : '#FAFAFA',
    '& td[type="actions"]': {
      opacity: 0,
      transition: 'opacity 0.06s'
    },
    '&:hover td[type="actions"]': {
      opacity: 1
    }
  }
})

const TbodyRow: React.FC<TbodyRowProps> = ({ children, index, onClick }) => {
  return (
    <TableRowRoot index={index} onClick={onClick}>
      {children}
    </TableRowRoot>
  )
}

export default TbodyRow