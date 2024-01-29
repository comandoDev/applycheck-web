import { Metadata } from 'next'
import './global.css'
import { AuthContextProvider } from '@/hooks/useAuth'

export const metadata: Metadata = {
  title: 'Auditlis',
  description: 'Plataforma para controle de checklists',
}

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
