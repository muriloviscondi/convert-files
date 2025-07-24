import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { system, StyledThemeProvider } from '@lib'

import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StyledThemeProvider>
    <ChakraProvider value={system}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StyledThemeProvider>,
)
