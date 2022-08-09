import * as React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import createTheme, { Theme, ThemeOptions } from '@mui/material/styles/createTheme'

import palette from './src/palette'
import typography from './src/typography'
import transitions from './src/transitions'
import shadows from './src/shadows'
import components from './src/components'

export const defaultTheme = {
  palette,
  typography,
  transitions,
  shadows,
  components,
}
export const theme = createTheme(defaultTheme)

interface ThemeProviderProps extends ThemeOptions {
  theme?: Theme,
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, palette }) => {

  return (
    <MuiThemeProvider theme={{
      ...theme,
      palette: {
        ...theme.palette,
        ...palette,
      }
    }}>
      {children}
    </MuiThemeProvider>
  )
}

ThemeProvider.defaultProps = {
  palette: {},
}

export default ThemeProvider
