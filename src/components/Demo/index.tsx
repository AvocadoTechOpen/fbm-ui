import React from 'react'
import { Theme } from '@mui/material'
import styled from '@mui/material/styles/styled'

import ThemeProvider from '../ThemeProvider'
import Box from '../Box'
import Paper from '../Paper'

export interface DemoProps {
  white?: boolean;
  grey?: boolean;
  bgColor?: string;
  theme?: Theme;
  elevation?: number;
}

const Root: React.FC<DemoProps> = styled(Box)(({ theme, grey, white, bgColor}: DemoProps) => {
  return {
    padding: '24px',
    display: 'flex',
    borderRadius: 10,
    ...(grey && {
      backgroundColor: 'rgb(245, 245, 245)'
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
  bgColor,
  elevation,
  ...otherProps
}) => {
  return (
    <ThemeProvider>
      <Paper elevation={elevation}>
        <Root
          grey={grey}
          white={white}
          bgColor={bgColor}
          {...otherProps}
        >
          {children}
        </Root>
      </Paper>
    </ThemeProvider>
  )
}

Demo.defaultProps = {
  grey: true,
  elevation: 0
}

export default Demo