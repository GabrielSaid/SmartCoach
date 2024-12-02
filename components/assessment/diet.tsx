'use client'

import { useState } from 'react'
import { Leaf, Egg, UtensilsCrossed, Apple } from 'lucide-react'
import { useAssessmentContext } from '@/lib/hooks/assessment-context'

export default function DietStep() {
  const { assessmentData, updateAssessmentData } = useAssessmentContext()

  const preferences = [
    {
      id: 'plant-based',
      label: 'Baseado em plantas',
      subLabel: 'Vegano',
      icon: Leaf
    },
    {
      id: 'carb-diet',
      label: 'Dieta de Carbo',
      subLabel: 'Pão, etc',
      icon: Egg
    },
    {
      id: 'specialized',
      label: 'Especializado',
      subLabel: 'Paleo, keto, etc',
      icon: UtensilsCrossed
    },
    {
      id: 'traditional',
      label: 'Tradicional',
      subLabel: 'Frutas, etc',
      icon: Apple
    }
  ]

  return (
    <div className="w-full">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Você tem alguma preferência alimentar específica?
      </h2>
      <div className="mb-8 grid grid-cols-2 gap-4">
        {preferences.map(pref => (
          <label
            key={pref.id}
            className={`flex cursor-pointer flex-col justify-between rounded-2xl p-4 transition-all ${
              assessmentData['dietary-preference'] === pref.id
                ? 'bg-orange-500 text-white'
                : 'bg-secondary'
            }`}
          >
            <input
              type="radio"
              name="dietary-preference"
              value={pref.id}
              checked={assessmentData['dietary-preference'] === pref.id}
              onChange={() =>
                updateAssessmentData('dietary-preference', pref.id)
              }
              className="sr-only"
            />
            <div className="mb-2">
              <div className="font-semibold">{pref.label}</div>
              <div className="text-sm opacity-80">{pref.subLabel}</div>
            </div>
            <div
              className={`self-end ${
                'dietary-preference' === pref.id
                  ? 'text-white'
                  : 'text-gray-500'
              }`}
            >
              <pref.icon size={24} />
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
