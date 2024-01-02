'use client'

import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'

export function GameCard(props) {
  const toast = useToast()
  const isDisabled = props.disabled

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      bg="silver.100"
      color="violet.100"
      border="none"
      opacity={isDisabled ? 0.5 : 1}
      maxW="auto"
      width="auto"
      height="100px"
      {...props}
    >
      <Image
        src={props.src}
        alt={props.alt}
        borderRadius={'md'}
        boxSize="100px"
      />
      <Stack>
        <CardBody>
          <Heading size="md" color="violet.100">
            {props.header}
          </Heading>
          <Text color="violet.100">{props.children}</Text>
        </CardBody>
      </Stack>
    </Card>
  )
}
