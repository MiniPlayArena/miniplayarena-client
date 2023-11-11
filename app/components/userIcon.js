'use client'
import { Box, Avatar, Text } from '@chakra-ui/react'
import Image from 'next/image'

const crownUrl = 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crown.png'

export function UserIcon(props) {
    return (
        <Box display='flex' justifyContent='center' alignItems='center' flexDir='row' maxW='7.5rem' height='2.5rem' bg='silver.100' borderRadius='5' p='3' {...props}>
            <Avatar name={props.children} mr='3' size='sm' src={
                props.leader === 'true' ? (
                    crownUrl
                ) : (
                    'none'
                )}/>
            <Text color='violet.100'>
                {props.children}
            </Text>
        </Box>
    )
}