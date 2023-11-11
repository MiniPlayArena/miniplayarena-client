'use client'

// Supports weights 100-900
import '@fontsource-variable/space-grotesk'

import { buttonTheme } from './components/themes/buttonTheme'
import { extendTheme } from '@chakra-ui/react'
import { modalTheme } from './components/themes/modalTheme'

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
    Modal: modalTheme,
  },
  fonts: {
    body: `'Space Grotesk Variable', sans-serif`,
  },
})
