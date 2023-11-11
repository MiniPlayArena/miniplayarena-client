/** HOME */
'use client'
import { Container, Button } from '@chakra-ui/react'
import { StyledButton } from './components/themes/button'

const backgroundUrl = '' //https://i.pinimg.com/originals/6f/c3/07/6fc307f1950ce15f220aeee764e219e5.gif'

export function Index({ children }) {
<<<<<<< HEAD
    return (
        <Container 
            minH={'calc(100vh)'}
            minW={'calc(100vw)'}
            bg='salmon.100'>
            <StyledButton>
                Hello World!
                {children}
            </StyledButton>
        </Container>
  );
=======
  return (
    <Container minH={'calc(100vh)'} minW={'calc(100vw)'} bg="salmon.100">
      <StyledButton>Hello World!</StyledButton>
    </Container>
  )
>>>>>>> e13ec37e426aec48bcd6a503a973307f24c9d311
}
