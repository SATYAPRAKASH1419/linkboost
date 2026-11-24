'use client'

import { useEffect, useRef, useState } from 'react'
import {
  siAmericanexpress,
  siGooglepay,
  siGumroad,
  siMastercard,
  siPaypal,
  siPaytm,
  siPhonepe,
  siRazorpay,
  siStripe,
  siVisa,
  type SimpleIcon,
} from 'simple-icons'
import { buttonClasses } from '../ui/ButtonLink'
import { BrandIcon } from '../ui/PlatformIcon'

type Currency = 'INR' | 'USD'

interface Method {
  id: string
  label: string
  icon?: SimpleIcon
  currency: Currency
  panel: 'upi' | 'card' | 'hosted'
  note?: string
}

const METHODS: Method[] = [
  { id: 'upi', label: 'UPI', currency: 'INR', panel: 'upi' },
  { id: 'card', label: 'Card', currency: 'INR', panel: 'card' },
  { id: 'razorpay', label: 'Razorpay', icon: siRazorpay, currency: 'INR', panel: 'hosted', note: 'UPI, cards, netbanking & EMI' },
  { id: 'stripe', label: 'Stripe', icon: siStripe, currency: 'USD', panel: 'hosted', note: 'Cards, Apple Pay & Google Pay, worldwide' },
  { id: 'paypal', label: 'PayPal', icon: siPaypal, currency: 'USD', panel: 'hosted', note: 'PayPal balance or any card' },
  { id: 'gumroad', label: 'Gumroad', icon: siGumroad, currency: 'USD', panel: 'hosted', note: 'Instant delivery after payment' },
]

const PRICE: Record<Currency, { amount: string }> = {
  INR: { amount: '₹499' },
  USD: { amount: '$6' },
}

const UPI_APPS = [siGooglepay, siPhonepe, siPaytm]
const CARD_BRANDS = [siVisa, siMastercard, siAmericanexpress]
const AUTOPLAY_MS = 3200
const PROCESSING_MS = 1100

type Status = 'idle' | 'processing' | 'paid'

export function CheckoutDemo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
  const [autoplay, setAutoplay] = useState(true)
  const [hovering, setHovering] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const method = METHODS[activeIndex]
  const price = PRICE[method.currency]

  useEffect(() => {
    if (!autoplay || hovering || status !== 'idle') return
    const id = setInterval(() => setActiveIndex((index) => (index + 1) % METHODS.length), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [autoplay, hovering, status])

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  function selectMethod(index: number) {
    setAutoplay(false)
    setStatus('idle')
    setActiveIndex(index)
  }

  function handleTabKey(e: React.KeyboardEvent, index: number) {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (index + step + METHODS.length) % METHODS.length
    selectMethod(next)
    document.getElementById(`pay-tab-${METHODS[next].id}`)?.focus()
  }

  function pay() {
    setAutoplay(false)
    setStatus('processing')
    timeoutRef.current = setTimeout(() => setStatus('paid'), PROCESSING_MS)
  }

  const payLabel =
    method.panel === 'hosted'
      ? `Continue to ${method.label} · ${price.amount}`
      : `Pay ${price.amount}${method.panel === 'upi' ? ' via UPI' : ''}`

  return (
    <div
      className="w-full max-w-md"
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      <div className="elevate rounded-2xl bg-white p-4 text-ink sm:p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 flex-col justify-between rounded-xl bg-surface-panel p-2.5" aria-hidden="true">
            <span className="h-1.5 w-7 rounded-full bg-ink" />
            <span className="h-1 w-9 rounded-full bg-border-default" />
            <span className="h-1 w-6 rounded-full bg-border-default" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg font-bold tracking-tight">Life OS Notion Template</p>
            <p className="text-sm text-text-muted">by @ananya · digital download</p>
          </div>
          <p key={price.amount} className="animate-swap font-display text-2xl font-extrabold tracking-tight">
            {price.amount}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Payment method"
          className="mt-5 grid grid-cols-2 gap-2 min-[400px]:grid-cols-3"
        >
          {METHODS.map((item, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={item.id}
                id={`pay-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="pay-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectMethod(index)}
                onKeyDown={(e) => handleTabKey(e, index)}
                className={`flex h-10 min-w-0 items-center justify-center gap-1.5 rounded-full px-2 text-[13px] font-semibold sm:text-sm transition-colors duration-300 ease-out-quart focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${isActive ? 'bg-ink text-white' : 'bg-surface-panel text-text-secondary hover:text-ink'}`}
              >
                {item.icon ? (
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${isActive ? 'bg-white' : ''}`}>
                    <BrandIcon icon={item.icon} className="h-3.5 w-3.5" />
                  </span>
                ) : null}
                <span className="truncate">{item.label}</span>
              </button>
            )
          })}
        </div>

        <div id="pay-panel" role="tabpanel" aria-labelledby={`pay-tab-${method.id}`} className="mt-4">
          {status === 'paid' ? (
            <Receipt method={method} onReset={() => setStatus('idle')} />
          ) : (
            <>
              <div key={method.id} className="min-h-[11rem] animate-swap rounded-xl bg-surface-panel p-4 sm:min-h-[10rem]">
                {method.panel === 'upi' && <UpiPanel />}
                {method.panel === 'card' && <CardPanel />}
                {method.panel === 'hosted' && <HostedPanel method={method} />}
              </div>
              <button
                type="button"
                onClick={pay}
                disabled={status === 'processing'}
                className={`${buttonClasses('brand', 'lg')} mt-4 w-full px-4! text-center text-[15px]! leading-tight whitespace-normal! disabled:cursor-wait sm:text-base!`}
              >
                {status === 'processing' ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Confirming payment…
                  </>
                ) : (
                  payLabel
                )}
              </button>
            </>
          )}
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-xs text-blush/70">↑ Demo checkout. Tap a method, then pay.</p>
    </div>
  )
}

function UpiPanel() {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <QrCode />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">Scan with any UPI app</p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5 sm:gap-2">
          {UPI_APPS.map((app) => (
            <li key={app.slug} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white sm:h-9 sm:w-9">
              <BrandIcon icon={app} className="h-4.5 w-4.5" />
            </li>
          ))}
        </ul>
        <p className="mt-3 truncate rounded-lg bg-white px-3 py-2 font-mono text-xs text-text-subtle">or enter your UPI ID</p>
      </div>
    </div>
  )
}

function CardPanel() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2.5">
        <span className="min-w-0 truncate font-mono text-[13px] sm:text-sm sm:tracking-wider">4242 4242 4242 4242</span>
        <span className="flex shrink-0 gap-1 sm:gap-1.5">
          {CARD_BRANDS.map((brand) => (
            <BrandIcon key={brand.slug} icon={brand} className="h-4 w-4" />
          ))}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <span className="rounded-lg bg-white px-3 py-2.5 font-mono text-sm text-text-secondary">12 / 29</span>
        <span className="rounded-lg bg-white px-3 py-2.5 font-mono text-sm text-text-secondary">•••</span>
      </div>
      <p className="text-xs text-text-muted">Visa, Mastercard, RuPay & Amex accepted</p>
    </div>
  )
}

function HostedPanel({ method }: { method: Method }) {
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
          {method.icon ? <BrandIcon icon={method.icon} className="h-6 w-6" /> : null}
        </span>
        <div>
          <p className="font-semibold">Your {method.label} checkout</p>
          <p className="text-sm text-text-muted">{method.note}</p>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-text-muted">
        Already sell on {method.label}? Paste your checkout link and it opens right from your LinkBoost page.
      </p>
    </div>
  )
}

function Receipt({ method, onReset }: { method: Method; onReset: () => void }) {
  const price = PRICE[method.currency]
  const rows = [
    { label: 'Item', value: 'Life OS Notion Template' },
    { label: 'Paid via', value: method.label },
  ]

  return (
    <div className="animate-swap">
      <div className="rounded-xl bg-surface-panel px-5 pb-5 pt-6 [mask-image:radial-gradient(circle_at_8px_0,transparent_6px,black_6.5px)] [mask-position:-8px_0] [mask-size:16px_100%]">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" strokeDasharray="24" className="animate-draw" />
            </svg>
          </span>
          <div>
            <p className="font-semibold">Order confirmed</p>
            <p className="text-sm text-text-muted">Your buyer is all set</p>
          </div>
        </div>

        <dl className="mt-5 space-y-2.5 border-t border-dashed border-border-default pt-4 text-sm">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between">
              <dt className="text-text-muted">{row.label}</dt>
              <dd className="font-medium">{row.value}</dd>
            </div>
          ))}
          <div className="flex justify-between border-t border-dashed border-border-default pt-3 text-base">
            <dt className="font-semibold">Total paid</dt>
            <dd className="font-display font-extrabold">{price.amount}</dd>
          </div>
        </dl>
      </div>

      <button type="button" onClick={onReset} className={`${buttonClasses('outline', 'md')} mt-4 w-full text-ink`}>
        Try another method
      </button>
    </div>
  )
}

/** Decorative QR-style grid: fixed finder squares plus a deterministic pseudo-random fill */
const QR_SIZE = 21
const QR_CELLS = (() => {
  const cells: [number, number][] = []
  let seed = 7
  const isFinder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= QR_SIZE - 7 && y < 7) || (x < 7 && y >= QR_SIZE - 7)
  for (let y = 0; y < QR_SIZE; y++) {
    for (let x = 0; x < QR_SIZE; x++) {
      seed = (seed * 1103515245 + 12345) % 2147483648
      if (!isFinder(x, y) && seed % 100 < 46) cells.push([x, y])
    }
  }
  return cells
})()

function QrCode() {
  const finders = [
    [0, 0],
    [QR_SIZE - 7, 0],
    [0, QR_SIZE - 7],
  ]

  return (
    <svg viewBox={`-1 -1 ${QR_SIZE + 2} ${QR_SIZE + 2}`} className="h-24 w-24 shrink-0 rounded-xl bg-white p-1.5 sm:h-28 sm:w-28" aria-hidden="true">
      {finders.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x + 0.5} y={y + 0.5} width="6" height="6" rx="1.2" fill="none" stroke="#18181B" strokeWidth="1" />
          <rect x={x + 2} y={y + 2} width="3" height="3" rx="0.6" fill="#18181B" />
        </g>
      ))}
      {QR_CELLS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x + 0.1} y={y + 0.1} width="0.8" height="0.8" rx="0.2" fill="#18181B" />
      ))}
    </svg>
  )
}
