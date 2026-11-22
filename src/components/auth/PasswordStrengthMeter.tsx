'use client'

import React from 'react'
import { calculatePasswordStrength } from '@/lib/validation/authValidation'

interface PasswordStrengthMeterProps {
  password: string
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  if (!password) return null

  const strength = calculatePasswordStrength(password)

  return (
    <div className="w-full mt-2 flex items-center justify-between gap-3 text-left animate-slide-down-fade">
      {/* 4 Segment Progress Bar */}
      <div className="flex items-center gap-1.5 flex-1">
        {[1, 2, 3, 4].map((step) => {
          const isActive = strength.score >= step
          return (
            <div
              key={step}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                isActive ? strength.color : 'bg-zinc-200'
              }`}
            />
          )
        })}
      </div>

      {/* Label */}
      <span
        className={`text-xs font-semibold tracking-wide shrink-0 transition-colors duration-200 ${
          strength.score <= 1
            ? 'text-red-500'
            : strength.score === 2
            ? 'text-amber-600'
            : 'text-emerald-600'
        }`}
      >
        {strength.label}
      </span>
    </div>
  )
}
