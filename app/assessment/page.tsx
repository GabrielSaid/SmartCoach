'use client'

import { ArrowLeft, Loader2 } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  AssessmentProvider,
  useAssessmentContext
} from '@/lib/hooks/assessment-context'
import GoalStep from '@/components/assessment/goal'
import GenderStep from '@/components/assessment/gender'
import WeightStep from '@/components/assessment/weight'
import HeightStep from '@/components/assessment/height'
import AgeStep from '@/components/assessment/age'
import ExperienceStep from '@/components/assessment/experience'
import LimitationsStep from '@/components/assessment/limitations'
import PreferenceStep from '@/components/assessment/preference'
import CommitmentStep from '@/components/assessment/commitment'
// import SupplementStep from '@/components/assessment/supplement'
import LevelStep from '@/components/assessment/level'
// import CaloriesStep from '@/components/assessment/calories'
import SupplementSelectorStep from '@/components/assessment/supplement-selector'
import SleepStep from '@/components/assessment/sleep'
import TextualStep from '@/components/assessment/textual'
import { convertToLLM } from '@/lib/convert-to-llm'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const ParentComponent = ({ steps }: { steps: any[] }) => {
  const router = useRouter()
  const { assessmentData } = useAssessmentContext()

  const [isLoading, setIsLoading] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(0)

  const handleNext = async () => {
    const isNotLast = currentStep < steps.length - 1

    if (isNotLast) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsLoading(true)

      try {
        const stringfied = convertToLLM(assessmentData)
        const response = await fetch('/api/workout', {
          method: 'POST',
          body: JSON.stringify({ prompt: stringfied })
        })

        setIsLoading(false)

        if (response.ok) {
          toast.success('Plano de treino criado com sucesso!')
          router.push('/workout')
        } else {
          toast.error('Algo de errado aconteceu.')
          console.error('Erro de status: ', response.status)
        }
      } catch (error) {
        toast.error('Algo de errado aconteceu.')
        console.error(error)
        setIsLoading(false)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center p-4">
        <Button
          size="icon"
          variant="secondary"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <span className="sr-only hidden">Voltar</span>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="flex-1 text-center font-semibold">Avaliação</h1>
        <span className="rounded-lg bg-blue-100 px-2 py-1 text-sm text-blue-500">
          {`${currentStep + 1} de ${steps.length}`}
        </span>
      </header>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col p-6">
        {React.cloneElement(steps[currentStep], { currentStep })}
        {/* <pre>{JSON.stringify(assessmentData, null, 2)}</pre> */}
      </main>

      <footer className="mx-auto w-full max-w-xl p-6">
        <Button
          size="lg"
          className="w-full"
          onClick={handleNext}
          disabled={isLoading}
        >
          Continuar
          {isLoading ? (
            <Loader2 className="ml-2 animate-spin" />
          ) : (
            <ArrowLeft className="ml-2 h-5 w-5 rotate-180 transform" />
          )}
        </Button>
      </footer>
    </div>
  )
}

const steps = [
  <GoalStep />,
  <GenderStep />,
  <WeightStep />,
  <HeightStep />,
  <AgeStep />,
  <ExperienceStep />,
  <LevelStep />,
  <LimitationsStep />,
  // <DietStep />,
  <CommitmentStep />,
  <PreferenceStep />,
  // <SupplementStep />,
  <SupplementSelectorStep />,
  // <CaloriesStep />,
  <SleepStep />,
  <TextualStep />
]

export default function AssessmentPage() {
  return (
    <AssessmentProvider>
      <ParentComponent steps={steps} />
    </AssessmentProvider>
  )
}
