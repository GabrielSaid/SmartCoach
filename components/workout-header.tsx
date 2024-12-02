'use client'

import { clearWorkoutPlan } from '@/app/(dash)/workout/actions'

import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog'

function WorkoutHeaderBase({
  title,
  planId
}: {
  title: string
  planId: string
}) {
  const handleDeletePlan = async () => {
    clearWorkoutPlan(planId)
  }

  return (
    <div className="flex items-center justify-between">
      <h2 className="my-4 text-xl font-bold">{title}</h2>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="ghost" className="text-red-500">
            Mudar plano
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não poderá ser desfeita. Isso vai permanentemente
              excluir esse plano atual e permitir criar um novo do zero.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction onClick={handleDeletePlan}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export function WorkoutHeaderFallback() {
  return <Skeleton className="h-10 w-full" />
}

export function WorkoutHeader({
  title,
  planId
}: {
  title: string
  planId: string
}) {
  return <WorkoutHeaderBase title={title} planId={planId} />
}
