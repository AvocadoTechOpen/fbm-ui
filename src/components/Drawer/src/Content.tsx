import styled from '@mui/material/styles/styled'

import Box from '../../Box'

const DrawerContent = styled(Box)(({ isNullFooter = false }: { isNullFooter?: boolean }) => ({
  height: isNullFooter ? 'unset' : 'calc(100vh - 56px)',
  overflowY: 'auto',
  padding: '0 16px'
}))

export default DrawerContent