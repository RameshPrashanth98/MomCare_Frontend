import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MomCare',
  description: 'Maternal health case management',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
