import { Button } from '@chakra-ui/react'
import { ChakraBox } from './animations/chakraBox'

export function StyledButton(props) {
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
        <Button {...props}>
          {props.children}
        </Button>
      </ChakraBox>
    )
  }
  