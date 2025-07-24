import 'styled-components'

// Extend the DefaultTheme interface with our custom theme
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        50: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
      }
      gray: {
        50: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
      }
      white: string
      black: string
    }
    spacing: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
    }
    fontSize: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
    }
    borderRadius: {
      none: string
      sm: string
      md: string
      lg: string
      xl: string
      full: string
    }
    shadows: {
      sm: string
      md: string
      lg: string
      xl: string
    }
    breakpoints: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
}
