import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function SignLayout({ children }: PropsWithChildren) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  // redirect to home if user is already logged in
  if (data?.user) {
    redirect('/workout')
  }

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center py-10">
      <div className="w-full max-w-sm">
        <div className="mb-2 flex w-full justify-center">
          <svg
            width="49"
            height="48"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.5" width="48" height="48" rx="16" fill="#F97316" />
            <path
              d="M27.2872 11.5963C25.4782 10.9933 23.5104 10.9972 21.7014 11.6002C20.9598 11.8474 20.3981 12.4686 20.2315 13.2324L19.7865 15.2719C19.427 16.9196 19.2472 17.7435 18.6832 18.2998C18.1192 18.856 17.2929 19.0243 15.6403 19.361L13.7496 19.7461C12.9766 19.9036 12.3462 20.4629 12.0967 21.2112C11.4937 23.0203 11.4929 24.9785 12.0959 26.7876C12.3459 27.5377 12.9787 28.0963 13.754 28.2514L15.6804 28.6367C17.3704 28.9747 18.2154 29.1437 18.7863 29.7146C19.3572 30.2855 19.5262 31.1305 19.8642 32.8205L20.2495 34.7468C20.4045 35.5221 20.9632 36.1549 21.7133 36.405C23.5223 37.008 25.4782 37.008 27.2872 36.405C28.0373 36.1549 28.5959 35.5221 28.751 34.7468L29.1363 32.8205C29.4743 31.1305 29.6433 30.2855 30.2142 29.7146C30.7851 29.1437 31.6301 28.9747 33.3201 28.6367L35.2464 28.2514C36.0218 28.0963 36.6546 27.5377 36.9046 26.7876C37.5076 24.9785 37.5076 23.0227 36.9046 21.2136C36.6546 20.4635 36.0218 19.9049 35.2464 19.7499L33.3201 19.3646C31.6301 19.0266 30.7851 18.8576 30.2142 18.2867C29.6433 17.7158 29.4743 16.8708 29.1363 15.1808L28.751 13.2544C28.5959 12.4791 28.0373 11.8463 27.2872 11.5963Z"
              fill="white"
            />
          </svg>
        </div>

        {children}
      </div>
    </div>
  )
}
