# Styled Components Setup Guide

This project now includes styled-components alongside Chakra UI, providing you with flexible styling options.

## What's Included

### Dependencies Installed

- `styled-components` - CSS-in-JS library for styling React components
- `@types/styled-components` - TypeScript definitions

### Configuration Files

#### 1. Theme Configuration (`src/lib/styled-components/theme.ts`)

- Custom theme with colors, spacing, typography, and breakpoints
- TypeScript support with proper type definitions
- Consistent design tokens

#### 2. TypeScript Definitions (`src/types/styled.d.ts`)

- Extended DefaultTheme interface
- Full TypeScript support for theme properties

#### 3. Utility Functions (`src/lib/styled-components/utils.ts`)

- Media query helpers
- Theme accessor functions
- Common CSS mixins (flexCenter, flexColumn, etc.)
- Utility functions for truncating text, visual hiding, etc.

#### 4. Global CSS Reset (`src/lib/styled-components/GlobalReset.tsx`)

- Comprehensive CSS reset using createGlobalStyle
- Modern normalize.css approach
- Consistent cross-browser styling
- Accessibility-focused defaults
- Custom scrollbar styles
- Print styles included

#### 5. Theme Provider (`src/lib/styled-components/StyledThemeProvider.tsx`)

- Wraps your app with styled-components ThemeProvider
- Automatically includes GlobalReset
- Works alongside Chakra UI

## Usage Examples

### Basic Styled Component

```tsx
import styled from 'styled-components'
import { getColor, getBorderRadius, media } from '@lib'

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${getColor('primary.500')};
  color: ${getColor('white')};
  border-radius: ${getBorderRadius('md')};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${getColor('primary.600')};
  }

  ${media.md('font-size: 1.125rem;')}
`
```

### Using Theme Utilities

```tsx
import styled from 'styled-components'
import { flexCenter, getSpacing, getShadow } from '@lib'

const Card = styled.div`
  ${flexCenter}
  flex-direction: column;
  padding: ${getSpacing('lg')};
  box-shadow: ${getShadow('md')};
  border-radius: ${(props) => props.theme.borderRadius.lg};
`
```

### Responsive Design

```tsx
import styled from 'styled-components'
import { media } from '@lib'

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  ${media.md(`
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  `)}

  ${media.lg(`
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  `)}
`
```

### TypeScript Props

```tsx
import styled from 'styled-components'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const Button = styled.button<ButtonProps>`
  padding: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '0.5rem 1rem'
      case 'lg':
        return '1rem 2rem'
      default:
        return '0.75rem 1.5rem'
    }
  }};

  background-color: ${(props) =>
    props.variant === 'secondary' ? props.theme.colors.gray[200] : props.theme.colors.primary[500]};
`
```

## Global Reset Features

The `GlobalReset` component provides:

### ✅ Modern CSS Reset

- Box-sizing: border-box for all elements
- Consistent margins and padding reset
- Improved font rendering
- Better image and media defaults

### ✅ Accessibility Features

- Focus management for keyboard navigation
- Reduced motion support
- Screen reader optimizations
- Proper contrast and color handling

### ✅ Typography Defaults

- Consistent font families
- Proper line heights
- Code element styling
- Blockquote and HR styling

### ✅ Form Elements

- Consistent input styling
- Removed browser defaults
- Better focus states
- Cross-browser compatibility

### ✅ Custom Scrollbars

- Styled scrollbars for webkit browsers
- Consistent with theme colors

### ✅ Print Styles

- Optimized for printing
- Black and white conversion
- Proper page breaks

## Integration with Chakra UI

Both libraries work together seamlessly:

```tsx
// Chakra UI components
<Box p={4}>
  <Heading>Chakra UI Heading</Heading>
</Box>

// Styled components
<StyledCard>
  <StyledTitle>Styled Components Title</StyledTitle>
</StyledCard>
```

## Best Practices

1. **Use theme tokens**: Always use theme values instead of hardcoded values
2. **Responsive design**: Use the media query helpers for breakpoints
3. **TypeScript**: Define proper interfaces for component props
4. **Performance**: Use css helper for static styles
5. **Accessibility**: Follow WCAG guidelines in your styles

## Available Utilities

### Theme Accessors

- `getColor(path)` - Access theme colors
- `getSpacing(key)` - Access spacing values
- `getFontSize(key)` - Access font sizes
- `getBorderRadius(key)` - Access border radius values
- `getShadow(key)` - Access shadow values

### Media Queries

- `media.sm()` - Min-width 640px
- `media.md()` - Min-width 768px
- `media.lg()` - Min-width 1024px
- `media.xl()` - Min-width 1280px

### CSS Mixins

- `flexCenter` - Center content with flexbox
- `flexColumn` - Flex column layout
- `flexRow` - Flex row layout
- `truncateText` - Single-line text truncation
- `visuallyHidden` - Screen reader only content

## Resources

- [Styled Components Documentation](https://styled-components.com/)
- [TypeScript Support](https://styled-components.com/docs/api#typescript)
- [Best Practices](https://styled-components.com/docs/best-practices)
