/** HOME */
'use client'

import { Button, Container } from '@chakra-ui/react'

import { StyledButton } from './components/themes/button'

const backgroundUrl = '' //https://i.pinimg.com/originals/6f/c3/07/6fc307f1950ce15f220aeee764e219e5.gif'

export function Index({ children }) {
  return (
    <Container
      minH={'calc(100vh)'}
      minW={'calc(100vw)'}
      bg='salmon.100'>
      <StyledButton>
        Hello World!
      </StyledButton>
      {children}
    </Container>
  );
}
