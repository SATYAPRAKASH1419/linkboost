'use client'

import React, { useState, useId, forwardRef, useRef, useImperativeHandle } from 'react'

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string | null
  accessory?: React.ReactNode
  prefixElement?: React.ReactNode
  showSuccess?: boolean
  helperText?: string
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      label,
      error,
      accessory,
      prefixElement,
      showSuccess = false,
      helperText,
      type = 'text',
      id,
      className = '',
      onChange,
      onBlur,
      onKeyDown,
      onKeyUp,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    const innerInputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => innerInputRef.current as HTMLInputElement)

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [capsLockActive, setCapsLockActive] = useState(false)
    const isPasswordType = type === 'password'
    const computedType = isPasswordType ? (isPasswordVisible ? 'text' : 'password') : type

    const hasError = Boolean(error)

    function handleContainerClick(e: React.MouseEvent<HTMLDivElement>) {
      if ((e.target as HTMLElement).closest('button')) return
      innerInputRef.current?.focus()
    }

    function handleKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
      if (isPasswordType) {
        setCapsLockActive(e.getModifierState('CapsLock'))
      }
      if (e.type === 'keydown' && onKeyDown) onKeyDown(e)
      if (e.type === 'keyup' && onKeyUp) onKeyUp(e)
    }

    return (
      <div className="w-full text-left">
        {/* Label & Header Row */}
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor={inputId} className="text-[13px] font-semibold text-zinc-700 select-none cursor-pointer">
            {label}
          </label>
          {accessory}
        </div>

        {/* Input Wrapper Container - 44px (h-11) Professional Touch Target */}
        <div
          onClick={handleContainerClick}
          className={`group relative flex items-center h-11 w-full rounded-xl bg-white border transition-all duration-150 shadow-2xs cursor-text ${
            hasError
              ? 'border-red-400 ring-2 ring-red-500/10 bg-red-50/20'
              : 'border-zinc-300 focus-within:border-[#E23744] focus-within:ring-3 focus-within:ring-[#E23744]/10 hover:border-zinc-400'
          }`}
        >
          {/* Prefix (e.g., linkboost.bio/) */}
          {prefixElement && (
            <div className="pl-3.5 pr-0.5 flex items-center select-none text-sm text-zinc-400 font-mono cursor-text shrink-0">
              {prefixElement}
            </div>
          )}

          {/* Actual Input - 14px (text-sm) legible standard */}
          <input
            ref={innerInputRef}
            id={inputId}
            type={computedType}
            suppressHydrationWarning
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={handleKeyEvent}
            onKeyUp={handleKeyEvent}
            className={`w-full h-full bg-transparent px-3.5 text-sm text-zinc-900 font-medium placeholder-zinc-400 outline-none transition ${
              prefixElement ? 'pl-0' : ''
            } ${isPasswordType || showSuccess ? 'pr-10' : ''} ${className}`}
            {...props}
          />

          {/* Right Action / Status Icons */}
          <div className="absolute right-3 flex items-center gap-1.5">
            {/* Success indicator checkmark */}
            {showSuccess && !hasError && !isPasswordType && (
              <span className="text-emerald-600 transition-opacity animate-slide-down-fade" title="Valid">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}

            {/* Password Show/Hide Toggle */}
            {isPasswordType && (
              <button
                type="button"
                suppressHydrationWarning
                onClick={(e) => {
                  e.stopPropagation()
                  setIsPasswordVisible(!isPasswordVisible)
                }}
                className="text-zinc-400 hover:text-zinc-700 active:scale-95 transition-all p-1 rounded-md focus:outline-none cursor-pointer"
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {isPasswordVisible ? (
                  // Eye-Off Icon
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  // Eye Icon
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Caps Lock Alert */}
        {capsLockActive && (
          <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 animate-slide-down-fade">
            <svg className="w-3.5 h-3.5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19h14" />
            </svg>
            <span>Caps Lock is ON</span>
          </div>
        )}

        {/* Custom Inline Error */}
        {hasError && (
          <div
            id={errorId}
            role="alert"
            className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-[#E23744] animate-slide-down-fade"
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Helper text when no error */}
        {!hasError && helperText && (
          <p id={helperId} className="mt-1 text-xs text-zinc-400">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

AuthInput.displayName = 'AuthInput'
