'use client'

import { useState } from 'react'
import { X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SupplementStep() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Você está tomando algum suplemento?
      </h2>
      <div className="mb-8">
        <img
          src="/supplements.png"
          alt="A lot of supplements"
          className="h-auto w-full rounded-lg"
        />
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          variant={selectedOption === 'no' ? 'default' : 'outline'}
          onClick={() => setSelectedOption('no')}
        >
          Não
          <X className="ml-2 h-5 w-5" />
        </Button>
        <Button
          variant={selectedOption === 'yes' ? 'default' : 'outline'}
          onClick={() => setSelectedOption('yes')}
        >
          Sim
          <Check className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
