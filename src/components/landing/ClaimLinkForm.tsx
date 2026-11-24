'use client'

import { useId, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LANDING_COPY } from '@/lib/constants/landing'
import { ButtonArrow, buttonClasses } from './ui/ButtonLink'

interface ClaimLinkFormProps {
  buttonVariant?: 'brand' | 'ink'
}

export function ClaimLinkForm({ buttonVariant = 'brand' }: ClaimLinkFormProps) {
  const { prefix, placeholder, cta, inputLabel } = LANDING_COPY.claim
  const [username, setUsername] = useState('')
  const router = useRouter()
  const inputId = useId()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const query = username ? `?username=${encodeURIComponent(username)}` : ''
    router.push(`/signup${query}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:gap-2">
      <label htmlFor={inputId} className="sr-only">
        {inputLabel}
      </label>
      <div className="flex h-14 min-w-0 items-center sm:flex-1 rounded-full bg-white pl-6 pr-4 ring-1 ring-border-default transition-shadow duration-200 focus-within:ring-2 focus-within:ring-brand">
        <span className="font-mono text-[15px] font-medium text-ink">{prefix}</span>
        <input
          id={inputId}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className="w-full min-w-0 flex-1 bg-transparent font-mono text-[15px] text-ink outline-none placeholder:text-text-subtle"
        />
      </div>
      <button type="submit" className={buttonClasses(buttonVariant, 'lg')}>
        {cta}
        <ButtonArrow />
      </button>
    </form>
  )
}
