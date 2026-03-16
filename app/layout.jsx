import './globals.css'
import ThemeWrapper from '../components/ThemeWrapper'

export const metadata = {
  title: 'Calvin Le',
  description: 'Portfolio of Calvin Le',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="stylesheet"
          href="https://cdn.cubing.net/v0/css/@cubing/icons/css"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  )
}

