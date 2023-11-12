'use client'

import { Avatar, Box, Text } from '@chakra-ui/react'

import { Image } from '@chakra-ui/react'

const crownUrl =
  'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crown.png'

export function UserIcon({ isPlaying, n_cards, leader, isCurrentPlayer, children, winnerPlace, isNextPlayer }) {
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
        w="10rem"
        height="2.5rem"
        bg={isCurrentPlayer ? 'green.400' : (isNextPlayer ? '#fed7aa' : 'silver.100')}
        borderRadius="5"
        p="3"
        m="0.5rem"
      >
        <Avatar
          name={children}
          mr="3"
          size="sm"
          src={leader === 'true' ? crownUrl : 'none'}
        />
        <Text color="violet.100">{children}</Text>
      </Box>
      {isPlaying &&
        <Box display='flex' flexDir='row' alignItems='center'>
          <Text size='xl' fontWeight='bold'>
            {winnerPlace ? (
              <Text color='lime.400'>#{winnerPlace}</Text>
            ) : (
              <>
                {n_cards && n_cards === 1 ? <Text color='red.400'> UNO </Text> : n_cards}
              </>
            )}
          </Text>
          {!winnerPlace && (
            <Image
              src='./icon_hand.png'
              height='32px'
              width='32px'
              alt=''
            />
          )}
        </Box>
      }
    </Box>
  )
}
