import { Logout, LogoutFallback } from '@/components/logout'
import { ThemeToggle } from '@/components/theme-toggle'
import { FlameIcon } from 'lucide-react'
import { Suspense } from 'react'

export default function WorkoutLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-28 pt-6">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-lg">
          Olá! <FlameIcon className="inline-block h-5 w-5 text-orange-500" />
        </p>
        {/* <h1 className="text-3xl font-bold">Gabriel Said</h1> */}

        <div className="flex gap-1">
          <ThemeToggle />

          <Suspense fallback={<LogoutFallback />}>
            <Logout />
          </Suspense>
        </div>
      </div>

      <div className="flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  )
}
