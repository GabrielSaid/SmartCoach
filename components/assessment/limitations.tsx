'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useAssessmentContext } from '@/lib/hooks/assessment-context'

export default function LimitationsStep() {
  const { assessmentData, updateAssessmentData } = useAssessmentContext()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [commonTags, setCommonTags] = useState([
    'Dor no joelho',
    'Dor muscular'
  ])
  const [isOtherSelected, setIsOtherSelected] = useState(false)
  const [otherLimitation, setOtherLimitation] = useState('')

  const availableTags = [
    'Artrite',
    'Dor nas costas',
    'Asma',
    'Obesidade',
    'Dor no joelho'
  ]

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prevSelectedTags => {
      const newSelectedTags = prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter(t => t !== tag)
        : [...prevSelectedTags, tag]

      updateAssessmentData('limitations', newSelectedTags)
      return newSelectedTags
    })
  }

  const handleOtherInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherLimitation(e.target.value)
  }

  const handleAddOther = () => {
    if (otherLimitation.trim()) {
      handleTagSelect(otherLimitation)
      setOtherLimitation('')
      setIsOtherSelected(false)
    }
  }

  const handleCommonTagRemove = (tag: string) => {
    setCommonTags(commonTags.filter(t => t !== tag))
  }

  return (
    <div className="w-full">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Você tem alguma limitação física?
      </h2>
      <img src="/wheelchair.png" alt="Wheelchair" className="mx-auto mb-6" />
      <div className="relative mb-4">
        <div className="rounded-xl border-2 border-orange-500 bg-orange-100 p-4">
          <div className="mb-2 flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <div
                key={tag}
                className="flex items-center rounded-full bg-orange-500 px-2 py-1 text-sm text-white"
              >
                {tag}
                <button
                  onClick={() => handleTagSelect(tag)}
                  className="ml-1 text-white"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags
              .filter(tag => !selectedTags.includes(tag))
              .map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className="rounded-full border border-orange-500 bg-white px-2 py-1 text-sm text-orange-500"
                >
                  {tag}
                </button>
              ))}
            <button
              onClick={() => setIsOtherSelected(true)}
              className="rounded-full border border-orange-500 bg-white px-2 py-1 text-sm text-orange-500"
            >
              Outro
            </button>
          </div>
          {isOtherSelected && (
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={otherLimitation}
                onChange={handleOtherInput}
                className="w-full rounded-lg border p-2 text-sm"
                placeholder="Descreva sua limitação"
              />
              <button
                onClick={handleAddOther}
                className="rounded-full bg-orange-500 px-4 py-2 text-sm text-white"
              >
                Adicionar
              </button>
            </div>
          )}
        </div>
        <div className="absolute bottom-2 right-2 rounded-full bg-white p-1 text-gray-400">
          {selectedTags.length}/10
        </div>
      </div>
      <div className="mb-8">
        {/* 

     <p className="mb-2 text-sm text-gray-500">Mais comum:</p>
        <div className="flex flex-wrap gap-2">
          {commonTags.map(tag => (
            <div
              key={tag}
              className="flex items-center rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800"
            >
              {tag}
              <button
                onClick={() => handleCommonTagRemove(tag)}
                className="ml-1 text-blue-800"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

      */}
      </div>
    </div>
  )
}
