'use client'

import { useState } from 'react'
import { X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAssessmentContext } from '@/lib/hooks/assessment-context'

export default function ExperienceStep() {
  const { assessmentData, updateAssessmentData } = useAssessmentContext()

  return (
    <div className="mx-auto w-full max-w-md">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Você tem experiência anterior em exercícios?
      </h2>
      <div className="mb-8">
        <img
          src="/gym-workout.png"
          alt="Person lifting weights"
          className="h-auto w-full rounded-lg"
        />
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          variant={
            assessmentData['experience'] === 'não' ? 'default' : 'outline'
          }
          onClick={() => updateAssessmentData('experience', 'não')}
        >
          Não
          <X className="ml-2 h-5 w-5" />
        </Button>
        <Button
          variant={
            assessmentData['experience'] === 'sim' ? 'default' : 'outline'
          }
          onClick={() => updateAssessmentData('experience', 'sim')}
        >
          Sim
          <Check className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
