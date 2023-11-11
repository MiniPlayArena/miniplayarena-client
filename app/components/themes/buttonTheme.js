'use client'

import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const styled_dark = defineStyle({
  color: 'silver.100',
  bg: 'violet.100',
  fontWeight: 'semiBold',
})

const styled_light = defineStyle({
  color: 'violet.100',
  bg: 'silver.100',
  fontWeight: 'semiBold',
})

export const buttonTheme = defineStyleConfig({
  variants: { styled_dark, styled_light },
})
