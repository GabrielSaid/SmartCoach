import { useState } from 'react'
import { Mic } from 'lucide-react'
import { useAssessmentContext } from '@/lib/hooks/assessment-context'

export default function TextualStep() {
  const [isListening, setIsListening] = useState(false)
  const { assessmentData, updateAssessmentData } = useAssessmentContext()

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value.slice(0, 250)
    updateAssessmentData('textualInput', newText)
  }

  const handleVoiceInput = () => {
    setIsListening(true)
    // This is a mock function. In a real application, you would implement
    // speech recognition here using the Web Speech API or a similar service.
    setTimeout(() => {
      // setText(prev => prev + ' [Texto convertido da fala]')
      setIsListening(false)
    }, 2000)
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="mb-2 text-center text-2xl font-bold">
        Análise textual de IA
      </h1>
      <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
        Escreva livremente qualquer preocupação com condicionamento físico que
        esteja em sua mente. A AI vai ouvir. 👍
      </p>

      <div className="relative mb-4">
        <textarea
          value={assessmentData['textualInput']}
          onChange={handleTextChange}
          className="h-40 w-full resize-none rounded-xl border bg-white p-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white dark:text-black"
          placeholder="Não consigo fazer mais de 22 agachamentos. Também meu cotovelo não pode dobrar muito."
        />

        <div className="absolute bottom-3 right-3 text-sm text-gray-400">
          {assessmentData['textualInput']?.length}/250
        </div>
      </div>

      {/* 

          <button
        onClick={handleVoiceInput}
        className={`flex w-full items-center justify-center rounded-full py-3 font-medium transition-colors ${
          isListening ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        }`}
      >
        <Mic className="mr-2 h-5 w-5" />
        {isListening ? 'Ouvindo...' : 'Use a voz em vez disso'}
     </button> */}
    </div>
  )
}
