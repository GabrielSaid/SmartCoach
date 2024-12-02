import { Search, SearchFallback } from '@/components/search'
import { WorkoutsList } from '@/components/workouts-list'
import { Tables } from '@/lib/database.types'
import { parseSearchParams } from '@/lib/parse-search-params'
import { createClient } from '@/lib/supabase/server'
import { Suspense } from 'react'

import { getWorkoutPlan } from './actions'
import {
  WorkoutHeader,
  WorkoutHeaderFallback
} from '@/components/workout-header'
import EmptyState from '@/components/empty-state'

interface WorkoutPageParams {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function WorkoutPage({ searchParams }: WorkoutPageParams) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const searchParamsResolved = await searchParams
  const parsedSearchParams = parseSearchParams(searchParamsResolved)

  const workoutPlan = await getWorkoutPlan(data?.user?.id)

  if (!workoutPlan) {
    return <EmptyState />
  }

  const { workouts } = workoutPlan || {}

  const workoutsFiltered =
    workouts.length > 0
      ? workouts.filter((workout: Tables<'workouts'>) =>
          workout.name
            .toLowerCase()
            .includes(parsedSearchParams.search?.toLowerCase()?.trim() || '')
        )
      : workouts

  return (
    <>
      <div className="py-4">
        <Suspense fallback={<SearchFallback />}>
          <Search />
        </Suspense>
      </div>

      <Suspense fallback={<WorkoutHeaderFallback />}>
        <WorkoutHeader title={workoutPlan.name} planId={workoutPlan.id} />
      </Suspense>

      <WorkoutsList
        workouts={workoutsFiltered}
        searchParams={parsedSearchParams}
      />
    </>
  )
}
