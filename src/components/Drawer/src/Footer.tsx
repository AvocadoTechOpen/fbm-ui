import React from 'react'
import styled from '@mui/material/styles/styled'

import ConfirmFooter, { FbmConfirmFooterProps } from '../../ConfirmFooter'

const DrawerFooterRoot: React.FC<FbmConfirmFooterProps> = styled(ConfirmFooter)({
  height: '80px',
  boxSizing: 'border-box',
  padding: '24px',
})


export default DrawerFooterRoot