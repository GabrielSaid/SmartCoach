import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAssessmentContext } from '@/lib/hooks/assessment-context'

const labels = [
  'Sedentário',
  'Pouco ativo',
  'Um pouco atlético',
  'Atlético',
  'Muito atlético'
]
const totalStates = 5

const CurvedRange = () => {
  const [stateIndex, setStateIndex] = useState(0)
  const { updateAssessmentData } = useAssessmentContext()

  const currentLevel = stateIndex + 1

  const interpolatePath = (path1: string, path2: string, t: number) => {
    const commands1 = path1.match(/[A-Z][^A-Z]*/g)
    const commands2 = path2.match(/[A-Z][^A-Z]*/g)

    if (!commands1 || !commands2) {
      console.error('Invalid path data')
      return ''
    }

    return commands1
      .map((cmd1, i) => {
        const cmd2 = commands2[i]
        const type = cmd1[0]
        const values1 = cmd1.slice(1).trim().split(/\s+/).map(Number)
        const values2 = cmd2.slice(1).trim().split(/\s+/).map(Number)

        const interpolatedValues = values1.map((v1, j) => {
          const v2 = values2[j]
          return v1 + (v2 - v1) * t
        })

        return `${type}${interpolatedValues.join(' ')}`
      })
      .join(' ')
  }

  const getInterpolatedSVG = () => {
    const states = [
      'M16 348C58.5764 185.49 185.49 58.5764 348 16',
      'M16 348C58.5764 185.49 185.49 58.5764 348 16',
      'M16 348C58.5764 185.49 185.49 58.5764 348 16',
      'M16 348C58.5764 185.49 185.49 58.5764 348 16',
      'M16 348C58.5764 185.49 185.49 58.5764 348 16'
    ]

    const highlightPaths = [
      'M16 348 C23.8423 319.097 30.7696 300.578 35.9682 290.5',
      'M16 348C28.8423 298.982 49.3576 253.203 76.2084 212',
      'M16 348C37.5394 265.786 80.664 192.682 139.062 135',
      'M16 348C46.1482 232.927 118.583 135.702 216 73.6307',
      'M16 348C58.5764 185.49 185.49 58.5764 348 16'
    ]

    const currentState = states[Math.floor(stateIndex)]
    const nextState =
      states[Math.min(Math.floor(stateIndex) + 1, states.length - 1)]
    const t = stateIndex % 1

    const interpolatedPath = interpolatePath(currentState, nextState, t)
    const interpolatedHighlight = interpolatePath(
      highlightPaths[Math.floor(stateIndex)],
      highlightPaths[
        Math.min(Math.floor(stateIndex) + 1, highlightPaths.length - 1)
      ],
      t
    )

    return { interpolatedPath, interpolatedHighlight }
  }

  const { interpolatedPath, interpolatedHighlight } = getInterpolatedSVG()

  const decreaseState = () => {
    setStateIndex(Math.max(0, stateIndex - 1))
    updateAssessmentData('level', labels[Math.max(0, stateIndex - 1)])
  }

  const increaseState = () => {
    setStateIndex(Math.min(totalStates - 1, stateIndex + 1))
    updateAssessmentData(
      'level',
      labels[Math.min(totalStates - 1, stateIndex + 1)]
    )
  }

  return (
    <div className="relative mb-12 flex flex-col gap-4">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8">
        <svg
          width="361"
          height="363"
          viewBox="0 0 361 363"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={interpolatedPath}
            stroke="currentColor"
            className="stroke-[#111214] dark:stroke-white"
            strokeWidth="32"
            strokeLinejoin="round"
            strokeDasharray="1 96"
          />
          <path
            d={interpolatedPath}
            stroke="currentColor"
            className="stroke-[#111214] dark:stroke-white"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d={interpolatedHighlight}
            stroke="currentColor"
            className="stroke-orange-500"
            strokeWidth="8"
            strokeLinejoin="round"
          />

          <text
            x="321.80339887498945"
            y="322.44294954150536"
            fill="currentColor"
            className="fill-orange-500"
            textAnchor="middle"
            fontSize="96"
            fontWeight="bold"
          >
            {currentLevel}
          </text>

          <text
            x="271.80339887498945"
            y="359.44294954150536"
            fill="currentColor"
            className="fill-orange-500"
            textAnchor="middle"
            fontSize="20"
            fontWeight="bold"
          >
            {labels[currentLevel - 1]}
          </text>
        </svg>

        <div className="flex justify-center space-x-4">
          <Button onClick={decreaseState} disabled={stateIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
            Diminuir
          </Button>
          <Button
            onClick={increaseState}
            disabled={stateIndex === totalStates - 1}
          >
            Aumentar
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CurvedRange
