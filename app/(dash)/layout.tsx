'use client'

import { PropsWithChildren, useState } from 'react'
import { Home, BarChart2, User } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

export default function HomeLayout({ children }: PropsWithChildren) {
  const [activeTab, setActiveTab] = useState('plano')

  return (
    <div className="h-screen">
      <div className="mx-auto flex max-w-xl flex-col">
        {children}

        {/* Floating navbar */}
        <nav className="fixed bottom-4 left-4 right-4 mx-auto flex max-w-xl items-center justify-between rounded-xl bg-muted px-6 py-4 text-white shadow-lg dark:bg-slate-800">
          <button
            onClick={() => setActiveTab('plano')}
            className={`flex items-center gap-1 ${
              activeTab === 'plano'
                ? 'rounded-full bg-orange-500 px-4 py-2 text-white'
                : 'text-gray-400'
            }`}
          >
            <Home className="h-4 w-4" />
            <span className="mt-0.5 text-xs">Plano</span>
          </button>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button className="flex items-center gap-1 text-gray-400">
                <BarChart2 className="h-5 w-5" />
                {activeTab === 'progresso' && (
                  <span className="mt-1 text-xs">Progresso</span>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Em breve</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button className="flex items-center gap-1 text-gray-400">
                <User className="h-5 w-5" />
                {activeTab === 'perfil' && (
                  <span className="mt-1 text-xs">Perfil</span>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Em breve</p>
            </TooltipContent>
          </Tooltip>
        </nav>
      </div>
    </div>
  )
}
