'use client'

import { Container, Heading, Text } from '@chakra-ui/react'
import { StyledButton } from '../components/button'
import { Link } from '@chakra-ui/next-js'
import { useDisclosure } from '@chakra-ui/react'
import { BasicColorPicker } from '../components/modal_color_picker'
import { useState } from 'react'

export default function Page() {
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
      <Heading size="2xl" my="1rem">
        MiniPlayArena
      </Heading>
      <Heading size="md" mb="1rem">
        {' '}
        How to play
      </Heading>
      <Text>Every user enters in their desired username!</Text>
      <Text>One user creates a party and selects a game.</Text>
      <Text>
        He then shares the game code with others, who can use it to join the
        party.
      </Text>
      <Text>
        Once everyone is in, the party leader can now start the game. The rest
        is up to you! 🎲
      </Text>
      <Text>
        These are all classic games, so the rules are the same as ever :)
      </Text>
      <Link href="/">
        <StyledButton variant="styled_dark">Back</StyledButton>
      </Link>
    </Container>
  )
}
