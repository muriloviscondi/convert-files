import { createSystem, defaultConfig } from '@chakra-ui/react'

// Create a custom theme by extending the default config
export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        // You can add custom color tokens here
        brand: {
          50: { value: '#e6f3ff' },
          100: { value: '#bae0ff' },
          200: { value: '#8dcbff' },
          300: { value: '#61b6ff' },
          400: { value: '#34a1ff' },
          500: { value: '#0a8cff' },
          600: { value: '#0070d9' },
          700: { value: '#0054b3' },
          800: { value: '#00388c' },
          900: { value: '#001c66' },
        },
      },
    },
  },
})
