import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { modalAnatomy as parts } from '@chakra-ui/anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const styled = definePartsStyle({
  overlay: {
    bg: 'none',
    backdropBlur: '2px',
  },
  dialog: {
    color: 'silver.100',
    bg: 'violet.100',
    borderRadius: 'md',
  },
  body: {
    bg: 'violet.100',
    color: 'silver.100',
  },
  header: {
    color: 'silver.100',
  },
  footer: {
    bg: 'violet.100',
    borderRadius: 'md',
  },
})

export const modalTheme = defineMultiStyleConfig({
  variants: { styled },
})
