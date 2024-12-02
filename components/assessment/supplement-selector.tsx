'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useAssessmentContext } from '@/lib/hooks/assessment-context'

const supplements = [
  'Whey Protein',
  'Creatina',
  'BCAA',
  'Beta-Alanina',
  'Glutamina ',
  'Pré-treino',
  'Caseína',
  'Ômega-3',
  'Multivitamínico',
  'Vitamina D',
  'Ácido fólico',
  'Magnésio',
  'L-carnitina',
  'ZMA',
  'Colágeno',
  'Probioticos'
]

export default function SupplementSelectorStep() {
  const { assessmentData, updateAssessmentData } = useAssessmentContext()
  const [selectedSupplements, setSelectedSupplements] = useState<string[]>(
    assessmentData['supplements'] || []
  )

  const toggleSupplement = (supplement: string) => {
    setSelectedSupplements(prev => {
      const updatedSupplements = prev.includes(supplement)
        ? prev.filter(s => s !== supplement)
        : [...prev, supplement]

      updateAssessmentData('supplements', updatedSupplements)
      return updatedSupplements
    })
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold">Especificar suplemento</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Por favor, especifique seu suplemento.
        </p>
      </div>

      <div className="mb-4 flex items-center">
        <span className="text-gray-600 dark:text-gray-400">Mais comuns</span>
      </div>

      <div className="-mx-6 mb-6 overflow-x-auto px-6">
        <div className="grid grid-cols-3 gap-2 pb-4 md:grid-cols-4">
          {supplements.map(supplement => (
            <button
              key={supplement}
              onClick={() => toggleSupplement(supplement)}
              className={`w-full flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
                selectedSupplements.includes(supplement)
                  ? 'bg-orange-500 text-white'
                  : 'border bg-white text-gray-800'
              }`}
            >
              {supplement}
            </button>
          ))}
        </div>
      </div>

      {selectedSupplements.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            Selecionados:
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedSupplements.map(supplement => (
              <span
                key={supplement}
                className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
              >
                {supplement}
                <button
                  onClick={() => toggleSupplement(supplement)}
                  className="ml-2 text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
