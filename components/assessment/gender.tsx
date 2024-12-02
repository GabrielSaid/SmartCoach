'use client'

import { X } from 'lucide-react'
import { useAssessmentContext } from '@/lib/hooks/assessment-context'
import { cn } from '@/lib/utils'

export default function GenderStep() {
  const { assessmentData, updateAssessmentData } = useAssessmentContext()

  const genders = [
    { id: 'masculino', label: 'Masculino', icon: '♂️' },
    { id: 'feminino', label: 'Feminino', icon: '♀️' }
  ]

  return (
    <div className="mx-auto w-full max-w-sm">
      <h2 className="mb-8 text-center text-2xl font-bold">
        Qual é o seu gênero?
      </h2>

      <div className="space-y-4">
        {genders.map(gender => (
          <label
            key={gender.id}
            className={`relative block overflow-hidden rounded-xl ${
              assessmentData['gender'] === gender.id
                ? 'ring-2 ring-orange-500'
                : 'ring-1 ring-gray-200'
            }`}
          >
            <input
              type="radio"
              name="gender"
              value={gender.id}
              checked={assessmentData['gender'] === gender.id}
              onChange={() => updateAssessmentData('gender', gender.id)}
              className="sr-only"
            />
            <div className="aspect-[2/1] w-full">
              <img
                src={`/${gender.id}-running.png`}
                alt={gender.label}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute left-3 top-3 flex items-center rounded-full bg-opacity-90 px-2 py-1">
              <span className="mr-2 text-lg text-slate-800">{gender.icon}</span>
              <span className="font-medium text-slate-800">{gender.label}</span>
            </div>
            <div className="absolute bottom-3 left-3 flex h-6 w-6 items-center justify-center rounded-full border-2">
              <div
                className={`h-4 w-4 rounded-full ${
                  assessmentData['gender'] === gender.id
                    ? 'bg-orange-500 ring-2 ring-inset ring-orange-200'
                    : 'bg-gray-300'
                }`}
              ></div>
            </div>
          </label>
        ))}
      </div>

      {/* Botão de "Prefiro pular, obrigado!" */}
      <label
        className={`relative mt-4 block overflow-hidden rounded-xl ${
          assessmentData['gender'] === 'skip'
            ? 'bg-orange-500 text-white ring-2 ring-orange-500'
            : 'bg-orange-100 text-orange-600 ring-1 ring-gray-200'
        }`}
      >
        <input
          type="radio"
          name="gender"
          value="skip"
          checked={assessmentData['gender'] === 'skip'}
          onChange={() => updateAssessmentData('gender', 'skip')}
          className="sr-only"
        />
        <div className="flex w-full items-center justify-between p-4 font-medium">
          Prefiro pular, obrigado!
          <X className="h-5 w-5" />
        </div>
      </label>
    </div>
  )
}
