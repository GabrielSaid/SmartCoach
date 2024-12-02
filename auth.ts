import 'server-only'
import { createClient } from './lib/supabase/server'

export const auth = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getSession()

  if (error) throw error

  return data.session
}
