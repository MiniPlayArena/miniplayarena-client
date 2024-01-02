/** HOME */
'use client'

import { Container, Heading, Text } from '@chakra-ui/react'

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
      <Text mb="0.5rem">
        Play{' '}
        <Text as="b" color="lime.400">
          UNO
        </Text>{' '}
        online for{' '}
        <Text as="b" color="yellow.400">
          free with friends
        </Text>
        !
      </Text>
      {children}
    </Container>
  )
}
