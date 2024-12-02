'use server'

import 'server-only'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function getWorkoutPlan(userId?: string | null) {
  if (!userId) return null

  try {
    const supabase = await createClient()

    const { data: workoutPlan } = await supabase
      .from('workout_plans')
      .select('*')
      .eq('user_id', userId)
      .single()
      .throwOnError()

    if (!workoutPlan) return null

    const { data: workouts } = await supabase
      .from('workouts')
      .select('*')
      .eq('workout_plan_id', workoutPlan?.id)

    if (workouts && workouts.length < 1) return null

    return {
      ...workoutPlan,
      workouts
    }
  } catch (error) {
    return null
  }
}

export async function getWorkoutById(id: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('workouts')
    .select('*')
    .eq('id', id)
    .single()

  return data ?? null
}

export async function removeWorkout(id: string) {
  try {
    const supabase = await createClient()

    await supabase.from('workouts').delete().eq('id', id).throwOnError()

    return revalidatePath('/workout')
  } catch (error) {
    return {
      error: 'Unauthorized'
    }
  }
}

export async function clearWorkoutPlan(planId: string) {
  try {
    const supabase = await createClient()

    await supabase
      .from('workout_plans')
      .delete()
      .eq('id', planId)

      .throwOnError()
    return revalidatePath('/workout')
  } catch (error) {
    console.error('clear workout_plans error', error)
    return {
      error: 'Unauthorized'
    }
  }
}
