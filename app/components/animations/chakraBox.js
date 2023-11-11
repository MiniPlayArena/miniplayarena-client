import { motion, isValidMotionProp } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

export const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
})
