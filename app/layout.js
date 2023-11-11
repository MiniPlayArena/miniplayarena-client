import { Providers } from './providers'

export const metadata = {
  title: 'MiniPlayArena',
  description: 'Play popular games with you friends for free!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
