/** HOME */
'use client'

import { Box, Container, Heading } from '@chakra-ui/react'

import React from 'react'

export function Index({ children }) {
  return (
    <Container
      minH={'calc(100vh)'}
      minW={'calc(100vw)'}
      bg="purple.100"
      display="flex"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
    >
      <Heading>MiniPlayArena</Heading>
      {children}
    </Container>
  )
}
