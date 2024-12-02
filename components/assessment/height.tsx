'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

import { useAssessmentContext } from '@/lib/hooks/assessment-context'

export default function HeightStep() {
  const { assessmentData, updateAssessmentData } = useAssessmentContext()

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateAssessmentData('height', Number(event.target.value))
  }

  return (
    <div className="flex w-full max-w-md flex-col">
      <h2 className="mb-12 text-center text-3xl font-bold">
        Qual a sua altura?
      </h2>

      <div className="text-center">
        <span className="text-8xl font-bold">
          {(assessmentData['height'] / 100).toFixed(2).replace('.', ',')}
        </span>
        <span className="ml-2 text-4xl font-bold">m</span>
      </div>
      <div className="relative my-16">
        <label htmlFor="weight-range-input" className="sr-only">
          Sua altura
        </label>
        <input
          id="weight-range-input"
          type="range"
          min="100"
          max="230"
          step="1"
          value={assessmentData['height']}
          onChange={handleSliderChange}
          className={cn(
            'h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-orange-500 dark:bg-gray-700',
            '[&::-webkit-slider-thumb]:!h-16 [&::-webkit-slider-thumb]:!w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:!rounded-full [&::-webkit-slider-thumb]:!bg-orange-500'
          )}
        />
        <span className="absolute -bottom-12 start-0 text-sm text-gray-500 dark:text-gray-400">
          1.00
        </span>
        <span className="absolute -bottom-12 start-1/3 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">
          1.40
        </span>
        <span className="absolute -bottom-12 start-2/3 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">
          1.85
        </span>
        <span className="absolute -bottom-12 end-0 text-sm text-gray-500 dark:text-gray-400">
          2.30
        </span>
      </div>
    </div>
  )
}
