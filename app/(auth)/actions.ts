'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { message: 'Credenciais inválidas' }
  }

  redirect('/workout')
}

export async function signup(prevState: any, formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  if (formData.get('terms') !== 'on') {
    return { message: 'Você precisa aceitar os termos.' }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { message: 'Algo deu errado. Tente novamente.' }
  }

  redirect('/workout')
}
