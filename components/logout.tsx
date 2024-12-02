'use client'

import { createClient } from '@/lib/supabase/client'

import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

function LogoutBase({ disabled }: { disabled: boolean }) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <Button variant="ghost" onClick={handleLogout} disabled={disabled}>
      Sair
    </Button>
  )
}

export function LogoutFallback() {
  return <LogoutBase disabled />
}

export function Logout() {
  return <LogoutBase disabled={false} />
}
