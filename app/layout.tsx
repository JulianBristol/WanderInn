import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WanderInn',
  description: "Discover unique stays, from cozy cabins to urban lofts, and everything in between. With WanderInn, you'll find the ideal place to call home while you explore new destinations.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
