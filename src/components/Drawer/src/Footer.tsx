import React from 'react'
import styled from '@mui/material/styles/styled'

import ConfirmFooter, { FbmConfirmFooterProps } from '../../ConfirmFooter'

const DrawerFooterRoot: React.FC<FbmConfirmFooterProps> = styled(ConfirmFooter)({
  height: '56',
  boxSizing: 'border-box',
  padding: '0 24px',
})


export default DrawerFooterRoot