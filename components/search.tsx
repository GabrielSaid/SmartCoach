'use client'

import Form from 'next/form'
import { useFormStatus } from 'react-dom'
import { useRef, use, useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'next/navigation'
import { useBackpressure } from '@/lib/hooks/use-backpressure'

function SearchBase({ initialQuery }: { initialQuery: string }) {
  let inputRef = useRef<HTMLInputElement>(null)
  let [inputValue, setInputValue] = useState(initialQuery)

  let { triggerUpdate, formRef } = useBackpressure()

  async function handleSubmit(formData: FormData) {
    let query = formData.get('search') as string
    let newUrl = `/workout?search=${encodeURIComponent(query)}`
    await triggerUpdate(newUrl)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue = e.target.value
    setInputValue(newValue)
    formRef.current?.requestSubmit()
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      )
    }
  }, [])

  return (
    <Form
      ref={formRef}
      action={handleSubmit}
      className="relative flex w-full flex-1 flex-shrink-0 rounded shadow-sm"
    >
      <label htmlFor="search" className="sr-only">
        Buscar
      </label>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        onChange={handleInputChange}
        type="text"
        name="search"
        id="search"
        placeholder="Buscar treinos..."
        value={inputValue}
        className="w-full overflow-hidden px-10 py-6 text-base md:text-sm"
      />
      <LoadingSpinner />
    </Form>
  )
}

function LoadingSpinner() {
  let { pending } = useFormStatus()

  return (
    <div
      data-pending={pending ? '' : undefined}
      className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity duration-300"
    >
      <svg className="h-5 w-5" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray="282.7"
          strokeDashoffset="282.7"
          className={pending ? 'animate-fill-clock' : ''}
          transform="rotate(-90 50 50)"
        />
      </svg>
    </div>
  )
}

export function SearchFallback() {
  return <SearchBase initialQuery="" />
}

export function Search() {
  let query = useSearchParams().get('search') ?? ''
  return <SearchBase initialQuery={query} />
}