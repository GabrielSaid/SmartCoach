'use client'

import { useAssessmentContext } from '@/lib/hooks/assessment-context'

export default function GoalStep() {
  const { assessmentData, updateAssessmentData } = useAssessmentContext()

  const goals = [
    { id: 'lose-weight', label: 'Eu quero perder peso', icon: '🍎' },
    { id: 'ai-experiment', label: 'Quero experimentar o AI', icon: '🤖' },
    { id: 'gain-mass', label: 'Eu quero ganhar massa', icon: '💪' },
    { id: 'gain-resistance', label: 'Eu quero ganhar resistência', icon: '⚡' },
    { id: 'test-app', label: 'Só testando o aplicativo! 👍', icon: '🧪' }
  ]

  return (
    <>
      <h2 className="mb-8 text-center text-2xl font-bold">
        Qual é sua meta de condicionamento físico?
      </h2>

      <div className="space-y-4">
        {goals.map(goal => (
          <label
            key={goal.id}
            className={`flex items-center rounded-2xl border p-4 ${
              assessmentData['goal'] === goal.label
                ? 'bg-orange-500 text-white ring-2 ring-inset ring-orange-200'
                : null
            }`}
          >
            <input
              type="radio"
              name="goal"
              value={goal.label}
              checked={assessmentData['goal'] === goal.label}
              onChange={() => updateAssessmentData('goal', goal.label)}
              className="sr-only"
            />
            <span className="mr-3 text-xl">{goal.icon}</span>
            <span className="flex-1">{goal.label}</span>
            <div
              className={`h-5 w-5 rounded-full border-2 ${
                assessmentData['goal'] === goal.label
                  ? 'border-gray-400 bg-gray-400'
                  : 'border-gray-300'
              }`}
            >
              {assessmentData['goal'] === goal.label && (
                <div className="m-0.5 h-3 w-3 rounded-full bg-white"></div>
              )}
            </div>
          </label>
        ))}
      </div>
    </>
  )
}
