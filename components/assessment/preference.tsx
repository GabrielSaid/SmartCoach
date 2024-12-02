'use client'

import { useAssessmentContext } from '@/lib/hooks/assessment-context'

const exerciseOptions = [
  { id: 'andar', label: 'Andar', icon: '🚶' },
  { id: 'corrida', label: 'Corrida', icon: '🏃' },
  { id: 'cardio', label: 'Cardio', icon: '💓' },
  { id: 'yoga', label: 'Yoga', icon: '🧘' },
  { id: 'hipertrofia', label: 'Hipertrofia', icon: '💪' },
  { id: 'levantamento-peso', label: 'Lev. Peso', icon: '🏋️' }
]

export default function PreferenceStep() {
  const { assessmentData, updateAssessmentData } = useAssessmentContext()

  const toggleExercise = (label: string) => {
    const preferences = assessmentData['preferences'] || []

    const newPreferences = preferences.includes(label)
      ? preferences.filter((pref: any) => pref !== label)
      : [...preferences, label]

    updateAssessmentData('preferences', newPreferences)
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Você tem alguma preferência específica por exercícios?
      </h2>
      <div className="mb-8 grid grid-cols-3 gap-4">
        {exerciseOptions.map(option => (
          <button
            key={option.id}
            onClick={() => toggleExercise(option.label)}
            className={`flex flex-col items-center justify-center rounded-xl p-4 transition-colors ${
              assessmentData['preferences']?.includes(option.label)
                ? 'bg-orange-500 text-white'
                : 'bg-secondary'
            }`}
          >
            <span className="mb-2 text-3xl">{option.icon}</span>
            <span className="text-sm">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
