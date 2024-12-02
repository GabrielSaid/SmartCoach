import './globals.css'

import { Providers } from '@/components/providers'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: {
    default: 'SmartCoach',
    template: `%s - SmartCoach`
  },
  description: 'Seu personal trainer de IA.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <Toaster />
        <Providers attribute="class" defaultTheme="system" enableSystem>
          {children}
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
