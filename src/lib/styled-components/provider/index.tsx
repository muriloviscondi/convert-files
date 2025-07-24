import React from 'react'

import { ThemeProvider } from 'styled-components'

import { GlobalReset } from '../global-reset-styles'
import { styledTheme } from '../theme/theme'

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
