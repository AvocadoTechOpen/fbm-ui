import React from 'react'
import styled from '@mui/material/styles/styled'

import ConfirmFooter, { ConfirmFooterProps } from '../../ConfirmFooter'

const DrawerFooterRoot: React.FC<ConfirmFooterProps> = styled(ConfirmFooter)({
  height: '56px',
  boxSizing: 'border-box',
  padding: '0 16px',
  boxShadow: '0px -2px 4px rgba(0,0,0, 0.08)',
})


export default DrawerFooterRoot