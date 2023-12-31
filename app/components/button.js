import { Button } from '@chakra-ui/react'
import { ChakraBox } from './animations/chakraBox'

export function StyledButton(props) {
  return (
    <ChakraBox
      whileHover={{
        opacity: 0.9,
        scale: 1.08,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.92,
      }}
      maxW="fit-content"
      m="0.5rem"
    >
      <Button {...props}>{props.children}</Button>
    </ChakraBox>
  )
}
