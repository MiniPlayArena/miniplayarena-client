'use client'

import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const styled = defineStyle({
  color: 'silver.100',
})

export const textTheme = defineStyleConfig({
  variants: { styled },
})
