import { ChakraProvider } from '@chakra-ui/react'
import { StyledThemeProvider,system } from '@lib'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

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
