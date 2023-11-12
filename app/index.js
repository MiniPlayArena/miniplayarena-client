/** HOME */
'use client'

import { Container, Heading , Box } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'

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
      <Link href='/help' color='teal.500'> how to play</Link>
    </Container>
  )
}
