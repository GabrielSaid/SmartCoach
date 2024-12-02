import { useState } from 'react'
import { useAssessmentContext } from '@/lib/hooks/assessment-context'

const sleepOptions = [
  { id: 'excelente', label: 'Excelente', icon: '😊', duration: '>8 horas' },
  { id: 'boa', label: 'Boa', icon: '🙂', duration: '7-8 horas' },
  { id: 'normal', label: 'Normal', icon: '😐', duration: '6-7 horas' },
  { id: 'ruim', label: 'Ruim', icon: '🙁', duration: '3-4 horas' },
  { id: 'insone', label: 'Insone', icon: '😫', duration: '<2 horas' }
]

export default function SleepStep() {
  const { assessmentData, updateAssessmentData } = useAssessmentContext()

  const handleSelectSleep = (option: { duration: string }) => {
    updateAssessmentData('sleep', option.duration)
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-8 text-center text-2xl font-bold">
        Como é a qualidade do seu sono?
      </h2>
      <div className="space-y-3">
        {sleepOptions.map(option => (
          <button
            key={option.id}
            onClick={() => handleSelectSleep(option)}
            className={`flex w-full items-center justify-between rounded-full p-4 transition-colors ${
              assessmentData['sleep'] === option.duration
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <div className="flex items-center">
              <span className="mr-3 text-2xl">{option.icon}</span>
              <span className="font-medium">{option.label}</span>
            </div>
            <span className="text-sm opacity-80">{option.duration}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
