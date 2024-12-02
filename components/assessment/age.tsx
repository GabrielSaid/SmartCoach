'use client'

import { useAssessmentContext } from '@/lib/hooks/assessment-context'

let rangeOfAges: number[] = []

for (let i = 10; i <= 100; i += 1) {
  rangeOfAges.push(i)
}

export default function AgeStep() {
  const { assessmentData, updateAssessmentData } = useAssessmentContext()

  const handleAgeSelect = (age: number) => {
    updateAssessmentData('age', age)
  }

  return (
    <div className="w-full">
      <h2 className="mb-12 text-center text-3xl font-bold">Qual sua idade?</h2>
      <div className="relative h-[300px] overflow-y-auto ">
        {rangeOfAges.map(age => (
          <button
            key={age}
            onClick={() => handleAgeSelect(age)}
            className={`absolute w-full py-4 text-center text-4xl font-bold transition-all duration-300 ease-in-out ${
              age === assessmentData['age']
                ? 'z-10 scale-110 rounded-3xl bg-orange-500 text-white'
                : Math.abs(age - assessmentData['age']) === 1
                ? 'text-gray-800'
                : 'text-gray-400'
            }`}
            style={{
              transform: `translateY(${
                (age - assessmentData['age']) * 60 + 120
              }px)`
            }}
            aria-selected={age === assessmentData['age']}
          >
            {age}
          </button>
        ))}
      </div>
    </div>
  )
}
