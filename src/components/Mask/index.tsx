import * as React from 'react';
import { Box, BoxProps } from '@mui/material'
import styled from '@mui/material/styles/styled'

type ColorMap = 'white' | 'dark'
export interface MaskProps extends BoxProps { 
  color?: ColorMap | string
}
const colors =  {
  dark: 'rgba(0, 0, 0, .56)',
  white: 'rgba(255, 255, 255, .8)',
  none: ''
}

const MaskRoot: React.FC<MaskProps> = styled(Box)(({  color }: MaskProps) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 2,
  backgroundColor: colors[color] || color
}))

const FbmMask: React.FC<MaskProps> = ({
  children,
  ...otherProps
}) => (
  <MaskRoot {...otherProps}>
    {children}
  </MaskRoot>
)

FbmMask.defaultProps = {
  color: 'white',
}

export default FbmMask
