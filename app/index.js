/** HOME */
'use client'
import { Container, Button, Heading } from '@chakra-ui/react'
import { StyledButton } from './components/button'
import { VerticalCenteredModal } from './components/modal'

const backgroundUrl = '' //https://i.pinimg.com/originals/6f/c3/07/6fc307f1950ce15f220aeee764e219e5.gif'

export function Index({ children }) {
  return (
    <Container minH={'calc(100vh)'} minW={'calc(100vw)'} bg="purple.100">
      <StyledButton variant='styled_dark'>Hello World!</StyledButton>
      {children}
      <VerticalCenteredModal>
      Games go here
      </VerticalCenteredModal>
    </Container>
  )
}
