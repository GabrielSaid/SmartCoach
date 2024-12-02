import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { useAssessmentContext } from '@/lib/hooks/assessment-context'

export default function Component() {
  const { assessmentData, updateAssessmentData } = useAssessmentContext()
  const [calorieGoal, setCalorieGoal] = useState(1550)
  const [inputValue, setInputValue] = useState(calorieGoal.toString())
  const [isEditing, setIsEditing] = useState(false)

  const adjustCalories = (amount: number) => {
    const newCalorieGoal = Math.max(0, calorieGoal + amount)
    setCalorieGoal(newCalorieGoal)
    setInputValue(newCalorieGoal.toString())
    updateAssessmentData('calories', newCalorieGoal)
  }

  const formatCalories = (calories: number) => {
    return calories.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setInputValue(value)
  }

  const handleInputBlur = () => {
    const newCalorieGoal = parseInt(inputValue) || 0
    setCalorieGoal(newCalorieGoal)
    updateAssessmentData('calories', newCalorieGoal)
    setIsEditing(false)
  }

  const handleInputFocus = () => setIsEditing(true)

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-8 text-center text-2xl font-bold">
        Qual é sua meta de calorias por dia?
      </h2>
      <div className="mb-8 text-center">
        {isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            autoFocus
            className="w-40 text-center text-6xl font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        ) : (
          <span
            onClick={() => setIsEditing(true)}
            className="cursor-pointer text-6xl font-bold"
          >
            {formatCalories(calorieGoal)}
          </span>
        )}
        <p className="mt-2 text-gray-600 dark:text-gray-400">calorias/dia</p>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => adjustCalories(-10)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Diminuir calorias"
        >
          <Minus className="h-8 w-8 text-gray-600" />
        </button>
        <button
          onClick={() => adjustCalories(10)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Aumentar calorias"
        >
          <Plus className="h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  )
}
