'use client'

// Supports weights 100-900
import '@fontsource-variable/space-grotesk'

import { buttonTheme } from './components/themes/buttonTheme'
import { extendTheme } from '@chakra-ui/react'
import { inputTheme } from './components/themes/inputTheme'
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
  teal: {
    300: '#5eead4',
    500: '#14b8a6',
  },
  green: {
    400: '#4ade80',
    600: '#16a34a',
    700: '#15803d',
    card: '#50AA44',
  },
  lime: {
    400: '#a3e635',
  },
  red: {
    600: '#dc2626',
    800: '#991b1b',
    card: '#ED1C24',
  },
  yellow: {
    400: '#facc15',
    card: '#FFDE16',
  },
  blue: {
    500: '#3b82f6',
    card: '#0072BC',
  },
}

export const theme = extendTheme({
  colors,
  components: {
    Button: buttonTheme,
    Modal: modalTheme,
    Heading: {
      baseStyle: {
        color: 'silver.100',
      },
    },
    Text: {
      baseStyle: {
        color: 'silver.100',
      },
    },
    Input: inputTheme,
  },
  fonts: {
    body: `'Space Grotesk Variable', sans-serif`,
  },
})
