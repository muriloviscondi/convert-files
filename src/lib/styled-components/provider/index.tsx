import React from 'react'
import { ThemeProvider } from 'styled-components'
import { styledTheme } from '../theme/theme'
import { GlobalReset } from '../global-reset-styles'

interface StyledThemeProviderProps {
  children: React.ReactNode
}

export const StyledThemeProvider: React.FC<StyledThemeProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={styledTheme}>
      <GlobalReset />
      {children}
    </ThemeProvider>
  )
}
