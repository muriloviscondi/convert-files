import type { DefaultTheme } from 'styled-components'

// Media query helpers
export const media = {
  sm: (styles: string) => `@media (min-width: 640px) { ${styles} }`,
  md: (styles: string) => `@media (min-width: 768px) { ${styles} }`,
  lg: (styles: string) => `@media (min-width: 1024px) { ${styles} }`,
  xl: (styles: string) => `@media (min-width: 1280px) { ${styles} }`,
}

// Theme accessor helpers
export const getColor = (color: string) => (props: { theme: DefaultTheme }) => {
  const keys = color.split('.')
  let value: any = props.theme.colors

  for (const key of keys) {
    value = value?.[key]
  }

  return value || color
}

export const getSpacing =
  (spacing: keyof DefaultTheme['spacing']) => (props: { theme: DefaultTheme }) =>
    props.theme.spacing[spacing]

export const getFontSize =
  (size: keyof DefaultTheme['fontSize']) => (props: { theme: DefaultTheme }) =>
    props.theme.fontSize[size]

export const getBorderRadius =
  (radius: keyof DefaultTheme['borderRadius']) => (props: { theme: DefaultTheme }) =>
    props.theme.borderRadius[radius]

export const getShadow =
  (shadow: keyof DefaultTheme['shadows']) => (props: { theme: DefaultTheme }) =>
    props.theme.shadows[shadow]

// Common styled-components mixins
export const flexCenter = `
  display: flex;
  align-items: center;
  justify-content: center;
`

export const flexColumn = `
  display: flex;
  flex-direction: column;
`

export const flexRow = `
  display: flex;
  flex-direction: row;
`

export const truncateText = `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const visuallyHidden = `
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`
