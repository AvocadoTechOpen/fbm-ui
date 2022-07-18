import * as React from 'react';

import { ThemeProvider as MuiThemeProvider  } from '@mui/material'

// import ThemeProvider, { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import createTheme, { Theme } from '@mui/material/styles/createTheme'

import palette from './src/palette'
import typography from './src/typography'
import transitions from './src/transitions'
import shadows from './src/shadows'
import components from './src/components'

export const theme = createTheme(
  {
    palette, 
    components,
    typography,
    transitions,
    shadows: (shadows as any),
  },
)

const ThemeProvider: React.FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
)


export default ThemeProvider
