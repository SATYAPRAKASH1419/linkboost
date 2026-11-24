'use client'

import { useState } from 'react'
import { CONTACT_COPY, CONTACT_EMAILS, type ContactTopic } from '@/lib/constants/contact'
import { ButtonArrow, buttonClasses } from '../landing/ui/ButtonLink'

const FIELD_CLASSES =
  'w-full rounded-2xl bg-white px-4 py-3.5 text-[15px] text-ink ring-1 ring-border-default outline-none transition-shadow duration-200 placeholder:text-text-subtle focus:ring-2 focus:ring-brand'

const LABEL_CLASSES = 'mb-2 block text-sm font-semibold text-ink'

export function ContactForm() {
  const { title, fields, topics, submit, success } = CONTACT_COPY.form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState<ContactTopic>('general')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const topicLabel = topics.find((item) => item.value === topic)?.label ?? ''
    const subject = encodeURIComponent(`${topicLabel} · ${name}`)
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`)
    window.location.href = `mailto:${CONTACT_EMAILS[topic]}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-blush p-6 sm:p-10">
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={LABEL_CLASSES}>
            {fields.name.label}
          </label>
          <input
            id="contact-name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={fields.name.placeholder}
            className={FIELD_CLASSES}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={LABEL_CLASSES}>
            {fields.email.label}
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={fields.email.placeholder}
            className={FIELD_CLASSES}
          />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className={LABEL_CLASSES}>{fields.topic.label}</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((item) => (
            <label key={item.value} className="cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={item.value}
                checked={topic === item.value}
                onChange={() => setTopic(item.value)}
                className="peer sr-only"
              />
              <span className="fill-hover block rounded-full bg-white px-4 py-2.5 text-sm font-medium text-text-secondary ring-1 ring-border-default transition-colors duration-300 [--fill:var(--color-blush-strong)] hover:text-wine peer-checked:bg-ink peer-checked:text-white peer-checked:ring-ink peer-checked:[--fill:var(--color-ink)] peer-focus-visible:ring-2 peer-focus-visible:ring-brand">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor="contact-message" className={LABEL_CLASSES}>
          {fields.message.label}
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={fields.message.placeholder}
          className={`${FIELD_CLASSES} resize-y`}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className={buttonClasses('brand', 'lg')}>
          {submit}
          <ButtonArrow />
        </button>
        <p role="status" className="text-sm text-text-secondary">
          {sent ? success : null}
        </p>
      </div>
    </form>
  )
}
