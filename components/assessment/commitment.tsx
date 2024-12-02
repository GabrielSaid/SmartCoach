'use client'

import { useState, useEffect } from 'react'
import { useAssessmentContext } from '@/lib/hooks/assessment-context'

export default function CommitmentStep() {
  const { assessmentData, updateAssessmentData } = useAssessmentContext()

  const [selectedDays, setSelectedDays] = useState(
    assessmentData['commitmentDays'] ?? 5
  )

  useEffect(() => {
    if (assessmentData['commitmentDays'] === undefined) {
      updateAssessmentData('commitmentDays', 5)
    }
  }, [assessmentData, updateAssessmentData])

  const handleDaySelect = (day: number) => {
    setSelectedDays(day)
    updateAssessmentData('commitmentDays', day)
  }

  return (
    <div className="w-full">
      <h2 className="mb-8 text-center text-2xl font-bold">
        Quantos dias da semana você vai se comprometer?
      </h2>
      <div className="mb-8 text-center">
        <span className="text-8xl font-bold">{selectedDays}</span>
        <span className="text-4xl font-bold">x</span>
      </div>
      <div className="mb-8 flex justify-center space-x-4">
        {[1, 2, 3, 4, 5].map(day => (
          <button
            key={day}
            onClick={() => handleDaySelect(day)}
            className={`h-12 w-12 rounded-full text-lg font-semibold ${
              selectedDays === day
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      <p className="text-center text-gray-600 dark:text-gray-400">
        Estou comprometido em fazer exercícios {selectedDays}x por semana
      </p>
    </div>
  )
}
