import React from 'react'
import { Theme } from '@mui/material'
import styled from '@mui/material/styles/styled'

import ThemeProvider from '../ThemeProvider'
import Box from '../Box'

export interface DemoProps {
  white?: boolean;
  grey?: boolean;
  bgColor?: string;
  theme?: Theme;
}

const Root: React.FC<DemoProps> = styled(Box)(({ theme, grey, white, bgColor}: DemoProps) => {
  return {
    padding: 20,
    ...(grey && {
      backgroundColor: theme.palette.grey['50']
    }),
    ...(white && {
      backgroundColor: '#fff'
    }),
    ...(bgColor && {
      backgroundColor: bgColor
    })
  }
})

const Demo: React.FC<DemoProps> = ({
  children,
  white,
  grey,
  bgColor
}) => {
  return (
    <ThemeProvider>
      <Root
        grey={grey}
        white={white}
        bgColor={bgColor}
      >
        {children}
      </Root>
    </ThemeProvider>
  )
}

Demo.defaultProps = {
  grey: true,
}

export default Demo