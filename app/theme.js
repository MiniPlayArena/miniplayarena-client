'use client'

import { extendTheme } from '@chakra-ui/react'
import { buttonTheme } from './components/themes/button'

const colors = {
  silver: {
    100: '#BEBBBB',
  },
  violet: {
    100: '#444054',
  },
  purple: {
    100: '#2F243A',
  },
  dogwoord: {
    100: '#FAC9B8',
  },
  salmon: {
    100: '#DB8A74',
  },
}

export const theme = extendTheme({
  colors,
  components: {
    Button: buttonTheme,
  },
})