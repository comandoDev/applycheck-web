'use client'

import './global.css'
import { AuthContextProvider } from '@/hooks/useAuth'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthContextProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthContextProvider>
  )
}
