# Chakra UI Setup Guide

This project has been configured with Chakra UI v3, a modular and accessible component library for React applications.

## What's Included

### Dependencies Installed

- `@chakra-ui/react` - Core Chakra UI components
- `@emotion/react` - Required peer dependency for styling
- `@emotion/styled` - Required peer dependency for styled components
- `framer-motion` - Required peer dependency for animations

### Configuration Files

#### 1. Theme Configuration (`src/theme.ts`)

Custom theme system with:

- Brand color palette (blue tones)
- Extended default configuration
- Ready for customization

#### 2. Provider Setup (`src/main.tsx`)

- ChakraProvider wrapping the entire app
- Custom theme system integration
- Proper provider hierarchy with React Router

#### 3. Example Components (`src/components/`)

- `WelcomeCard` - Reusable card component
- Demonstrates TypeScript interfaces
- Shows component composition patterns

## Key Features

### ✅ What's Working

- Modern Chakra UI v3 syntax
- TypeScript integration
- Custom theme system
- Responsive design patterns
- Accessible components by default

### 🎨 Customization

Edit `src/theme.ts` to customize:

- Colors (brand palette)
- Typography
- Component variants
- Breakpoints
- Spacing

### 📱 Responsive Design

Components use Chakra's responsive props:

```tsx
<Stack direction={{ base: 'column', md: 'row' }}>
  {/* Stacks vertically on mobile, horizontally on desktop */}
</Stack>
```

## Usage Examples

### Basic Components

```tsx
import { Box, Button, Text } from '@chakra-ui/react'

function MyComponent() {
  return (
    <Box p={4} bg="white" borderRadius="md">
      <Text mb={2}>Hello Chakra UI!</Text>
      <Button colorPalette="brand">Click me</Button>
    </Box>
  )
}
```

### Custom Theme Colors

```tsx
// Use your custom brand colors
<Button colorPalette="brand">Primary Button</Button>
<Text color="brand.500">Brand colored text</Text>
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## Next Steps

1. **Explore Components**: Visit [Chakra UI docs](https://v3.chakra-ui.com/) to see all available components
2. **Customize Theme**: Modify `src/theme.ts` to match your design system
3. **Add Components**: Create reusable components in `src/components/`
4. **Dark Mode**: Add color mode support (see Chakra UI docs)
5. **Icons**: Consider adding `@chakra-ui/icons` for icon components

## Resources

- [Chakra UI v3 Documentation](https://v3.chakra-ui.com/)
- [Component Gallery](https://v3.chakra-ui.com/docs/components)
- [Theme Customization](https://v3.chakra-ui.com/docs/theming/customize-theme)
- [TypeScript Support](https://v3.chakra-ui.com/docs/styled-system/typescript)
