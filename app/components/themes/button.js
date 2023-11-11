'use client'

import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

import { Button } from '@chakra-ui/react'
import { ChakraBox } from '../animations/chakraBox'

const styled = defineStyle({
  color: 'silver.100',
  bg: 'violet.100',
  fontWeight: 'semiBold',
  _hover: 'opacity: 0.8;',
})

export const buttonTheme = defineStyleConfig({
  variants: { styled },
})

export function StyledButton({ children, onClick, fontSize }) {
  return (
    <ChakraBox
      whileHover={{
        opacity: 0.9,
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.9,
      }}
      maxW="fit-content"
    >
      <Button variant="styled" onClick={onClick} fontSize={fontSize}>
        {children}
      </Button>
    </ChakraBox>
  )
}
