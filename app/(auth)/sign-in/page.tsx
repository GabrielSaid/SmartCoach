'use client'

import { Button } from '@/components/ui/button'
import { IconSpinner } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useActionState } from 'react'

import { login } from '../actions'

const initialState = {
  message: ''
}

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(login, initialState)

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full text-center">
        <h1 className="text-2xl/8 font-semibold text-zinc-950 dark:text-white sm:text-xl/8">
          Entrar
        </h1>
        <h2 className="text-base/6 text-zinc-500 dark:text-zinc-400 sm:text-sm/6">
          Vamos personalizar seus treinos com IA
        </h2>
      </div>

      <form action={formAction}>
        <fieldset className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="flex flex-col gap-y-1">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" name="password" type="password" required />
          </div>
        </fieldset>

        <div className="mt-4 flex items-center">
          <Button disabled={isPending}>
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            Entrar
          </Button>

          <p className="ml-4">
            Não tem uma conta?{' '}
            <Link href="/sign-up" className="font-medium">
              Cadastre-se
            </Link>
          </p>
        </div>
      </form>

      {state.message ? <p className="text-red-500">{state.message}</p> : null}
    </div>
  )
}
