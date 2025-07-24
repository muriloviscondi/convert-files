import { createGlobalStyle } from 'styled-components'

export const GlobalReset = createGlobalStyle`
  /* Simple CSS Reset - Only the essentials */
  
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default margin and padding from basic elements */
  body,
  h1, h2, h3, h4, h5, h6,
  p, blockquote, pre,
  dl, dd,
  ol, ul,
  figure,
  hr {
    margin: 0;
  }

  /* Set core defaults */
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  /* Make images responsive */
  img {
    max-width: 100%;
    height: auto;
  }
`
