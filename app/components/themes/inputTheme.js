'use client'

import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const styled = defineStyle({
  bg: 'silver.100',
  color: 'violet.100',
  borderRadius: 'md',
  borderColor: 'silver.100',
})

export const inputTheme = defineStyleConfig({
  variants: { styled },
})
