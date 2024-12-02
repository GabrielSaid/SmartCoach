import { ArrowLeft, Clock, Flame } from 'lucide-react'
import Link from 'next/link'

import { getWorkoutById } from '../actions'

export default async function WorkoutDetailsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const workout = await getWorkoutById(id)

  if (!workout) {
    return <div className="text-2xl font-semibold">Treino não encontrado.</div>
  }

  const hasSteps = workout.detailed.includes('1.')

  return (
    <div className="flex flex-col">
      <header className="flex items-center p-4">
        <Link href="/workout" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-semibold">{workout.name}</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="relative mb-6 overflow-hidden rounded-3xl">
          <img
            src="/workouts/workout2.jpg"
            alt="Man with abs"
            className="h-64 w-full object-cover"
          />
          <div className="z-2 absolute bottom-2 left-4 right-4">
            <div className="flex justify-between rounded-2xl bg-black bg-opacity-40 p-4 backdrop-blur-md">
              <div className="flex items-center">
                <Clock className="mr-2 h-6 w-6 text-orange-500" />
                <div>
                  <p className="text-xs text-white opacity-80">Tempo</p>
                  <p className="font-semibold text-white">{workout.time}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Flame className="mr-2 h-6 w-6 text-orange-500" />
                <div>
                  <p className="text-xs text-white opacity-80">Nível</p>
                  <p className="font-semibold text-white">{workout.level}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mb-8 text-gray-400">{workout.description}</p>
        <div className="mb-8 text-gray-400">
          {hasSteps
            ? // \d matches a digit (0-9)
              // \. matches a literal dot.
              // The parentheses around \d\. create a capturing group, so we can reuse this part in the replacement.
              // '\n$1 ' inserts a newline (\n) before the matched group ($1 corresponds to \d.), followed by a space.
              workout.detailed
                .replace(/(\d\.) /g, '\n$1 ')
                .trim()
                .split('\n')
                .map((step: string, index: number) => (
                  <p key={index} className="mb-2 text-gray-400">
                    {step}
                  </p>
                ))
            : workout.detailed}
        </div>
      </main>
    </div>
  )
}
