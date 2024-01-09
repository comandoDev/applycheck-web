'use client'

import { Inter } from 'next/font/google'
import './global.css'
import { AuthContextProvider } from '@/hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthContextProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthContextProvider>
  )
}
