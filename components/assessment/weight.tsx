'use client'

import { cn } from '@/lib/utils'
import { useAssessmentContext } from '@/lib/hooks/assessment-context'
import { useEffect } from 'react'

export default function WeightStep() {
  const { assessmentData, updateAssessmentData } = useAssessmentContext()

  useEffect(() => {
    if (
      assessmentData['weight'] === undefined ||
      assessmentData['weight'] === 160
    ) {
      updateAssessmentData('weight', 80)
    }
  }, [assessmentData, updateAssessmentData])

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateAssessmentData('weight', Number(event.target.value))
  }

  return (
    <div className="w-full">
      <h2 className="mb-12 text-center text-3xl font-bold">Qual o seu peso?</h2>
      <div className="mb-12 text-center">
        <span className="text-6xl font-bold proportional-nums">
          {assessmentData['weight'] ?? 80}
        </span>
        <span className="ml-2 text-4xl font-bold text-gray-400">kg</span>
      </div>

      <div className="relative mb-16 w-full">
        <label htmlFor="weight-range-input" className="sr-only">
          Seu peso
        </label>
        <input
          id="weight-range-input"
          type="range"
          min="30"
          max="300"
          step="0.5"
          value={assessmentData['weight'] ?? 80}
          onChange={handleSliderChange}
          className={cn(
            'h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-orange-500 dark:bg-gray-700',
            '[&::-webkit-slider-thumb]:!h-16 [&::-webkit-slider-thumb]:!w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:!rounded-full [&::-webkit-slider-thumb]:!bg-orange-500'
          )}
        />
        <span className="absolute -bottom-12 start-0 text-sm text-gray-500 dark:text-gray-400">
          30
        </span>
        <span className="absolute -bottom-12 start-1/3 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">
          115
        </span>
        <span className="absolute -bottom-12 start-2/3 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">
          215
        </span>
        <span className="absolute -bottom-12 end-0 text-sm text-gray-500 dark:text-gray-400">
          300
        </span>
      </div>
    </div>
  )
}
