'use client'

import { Avatar, Box, Text } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

const crownUrl =
  'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crown.png'

export function UserIcon(props) {
  const isPlaying = props.isPlaying
  const cards = props.n_cards
  return (
    <Box
    display='flex'
    justifyContent='center'
    alignItems='center'
    flexDir='column'
    maxW='fit-content'
    >
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="row"
      maxW="7.5rem"
      height="2.5rem"
      bg="silver.100"
      borderRadius="5"
      p="3"
      m="0.5rem"
      {...props}
    >
      <Avatar
        name={props.children}
        mr="3"
        size="sm"
        src={props.leader === 'true' ? crownUrl : 'none'}
        />
      <Text color="violet.100">{props.children}</Text>
    </Box>
        {isPlaying && 
          <Box display='flex' flexDir='row' alignItems='center'>
            <Text size='xl' fontWeight='bold'>
              {cards === 1 ? <Text color='red.400'> UNO </Text> : cards}
            </Text>
            <Image
              src='./icon_hand.png'
              height='32px'
              width='32px'
            />
            </Box>
        }
    </Box>
  )
}
