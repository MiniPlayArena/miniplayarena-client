'use client'
import {
  Text,
  Card,
  Stack,
  CardBody,
  Image,
  Heading,
} from '@chakra-ui/react'

export function GameCard(props) {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      bg="silver.100"
      color="violet.100"
      border='none'
      maxW="auto"
      width="auto"
      height="100px"
      {...props}
    >
      <Image
        src={props.src}
        alt={props.alt}
        borderRadius={'md'}
        boxSize='100px'
      />
      <Stack>
        <CardBody>
            <Heading size='md' color='violet.100'>
                {props.header}
            </Heading>
          <Text color='violet.100'>{props.children}</Text>
        </CardBody>
      </Stack>
    </Card>
  )
}
