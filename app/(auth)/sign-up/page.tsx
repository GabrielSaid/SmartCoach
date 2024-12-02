'use client'

import { Button } from '@/components/ui/button'
import { IconSpinner } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { useActionState } from 'react'

import { signup } from '../actions'
import { Checkbox } from '@/components/ui/checkbox'

const initialState = {
  message: ''
}

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signup, initialState)

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full text-center">
        <h1 className="text-3xl font-semibold text-zinc-950 dark:text-white sm:text-xl/8">
          Cadastre-se de graça
        </h1>
        <h2 className="text-base/6 text-zinc-500 dark:text-zinc-400 sm:text-sm/6">
          Crie sua conta rapidamente em 1 minuto
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

        <div className="items-top mt-4 flex space-x-2">
          <Checkbox id="terms" name="terms" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Aceitar termos e condições
            </label>
            <p className="text-sm text-muted-foreground">
              Ao clicar você concorda com os{' '}
              <Link href="/terms" className="underline">
                Termos de Uso
              </Link>{' '}
              e a{' '}
              <Link href="/policy" className="underline">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <Button disabled={isPending}>
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            Cadastrar
          </Button>
          <p className="ml-4">
            Já tem uma conta?{' '}
            <Link href="/sign-in" className="font-medium">
              Entre
            </Link>
          </p>
        </div>
      </form>

      {state.message ? <p className="text-red-500">{state.message}</p> : null}
    </div>
  )
}
