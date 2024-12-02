'use client'

import { removeWorkout } from '@/app/(dash)/workout/actions'
import { Tables } from '@/lib/database.types'
import { SearchParams, stringifySearchParams } from '@/lib/parse-search-params'
import Link from 'next/link'

export function WorkoutsList({
  workouts,
  searchParams
}: {
  workouts: Tables<'workouts'>[]
  searchParams: SearchParams
}) {
  return (
    <div className="flex flex-col gap-2">
      {!workouts?.length ? (
        <p className="col-span-full text-center text-muted-foreground">
          Sem treinos encontrados.
        </p>
      ) : (
        workouts.map(workout => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            searchParams={searchParams}
          />
        ))
      )}
    </div>
  )
}

function WorkoutCard({
  workout,
  searchParams
}: {
  workout: Tables<'workouts'>
  searchParams: SearchParams
}) {
  const handleDeleteWorkout = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    e.stopPropagation()

    await removeWorkout(workout.id)
  }

  return (
    <Link
      href={`/workout/${workout.id}?${stringifySearchParams(searchParams)}`}
      className="flex cursor-pointer items-center space-x-4 rounded-xl bg-muted p-4 dark:bg-slate-800"
    >
      <img
        src="/workout2.jpg"
        alt={workout.name}
        className="h-20 w-20 rounded-lg object-cover"
      />

      <div className="flex-1">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-semibold">{workout.name}</h3>
          <span className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white dark:bg-orange-600">
            {workout.level}
          </span>
        </div>

        <div className="flex items-start justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {workout.time}
          </p>

          {/* <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <TrashIcon className="h-4 w-4 text-red-700" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não poderá ser desfeita. Isso vai permanentemente
                  excluir esse treino.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>

                <AlertDialogAction onClick={handleDeleteWorkout}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> */}
        </div>
      </div>
    </Link>
  )
}
