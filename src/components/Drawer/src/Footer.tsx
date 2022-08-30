import React from 'react'
import styled from '@mui/material/styles/styled'

import ConfirmFooter, { ConfirmFooterProps } from '../../ConfirmFooter'

const DrawerFooterRoot: React.FC<ConfirmFooterProps> = styled(ConfirmFooter)({
  height: '56',
  boxSizing: 'border-box',
  padding: '0 16px',
})


export default DrawerFooterRoot