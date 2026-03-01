import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ULI - Modern Italian Furniture',
  description: 'Discover timeless Italian furniture designed for the way you live',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
