'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'submitting' | 'sent' | 'error';

const SUBJECTS = [
  'General enquiry',
  'Book an OPD consultation',
  'Wellness program / package',
  'In-patient admission & rooms',
  'International patient',
  'Products & pharmacy',
];

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? 'Something went wrong. Please try again.');
      }

      setStatus('sent');
      setMessage('Thank you — our team will respond within one working day.');
      form.reset();
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'We could not send your message. Please call us instead.',
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      {/* Honeypot — bots fill hidden fields, humans never see this. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" placeholder="Full name" />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+91 …"
        />
      </div>

      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
      />

      <label className="block">
        <span className="mb-1.5 block text-[0.8125rem] font-semibold text-jade-900">Subject</span>
        <div className="relative">
          <select
            name="subject"
            defaultValue={SUBJECTS[0]}
            className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-sand-200 bg-white pl-4 pr-11 text-[0.9375rem] text-jade-900 outline-none transition focus:border-jade-400"
          >
            {SUBJECTS.map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </select>
          <Icon.chevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-500"
            aria-hidden
          />
        </div>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[0.8125rem] font-semibold text-jade-900">
          Message <span className="font-normal text-sand-600">(optional)</span>
        </span>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your condition, your preferred dates, or anything you would like us to know."
          className="w-full resize-y rounded-xl border border-sand-200 bg-white px-4 py-3 text-[0.9375rem] leading-relaxed text-jade-900 outline-none transition placeholder:text-sand-500 focus:border-jade-400"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === 'submitting'} arrow={status !== 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>

        <p className="text-[0.75rem] leading-snug text-sand-700">
          We reply within one working day.
          <br />
          Your details are used only to respond to this enquiry.
        </p>
      </div>

      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            'flex items-start gap-2.5 rounded-xl px-4 py-3 text-[0.875rem]',
            status === 'sent'
              ? 'bg-jade-50 text-jade-800'
              : 'bg-clay-400/12 text-clay-600',
          )}
        >
          {status === 'sent' ? (
            <Icon.check className="mt-0.5 h-4.5 w-4.5 shrink-0" aria-hidden />
          ) : (
            <Icon.close className="mt-0.5 h-4.5 w-4.5 shrink-0" aria-hidden />
          )}
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.8125rem] font-semibold text-jade-900">
        {label}
        {required ? <span className="ml-0.5 text-clay-600">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-12 w-full rounded-xl border border-sand-200 bg-white px-4 text-[0.9375rem] text-jade-900 outline-none transition placeholder:text-sand-500 focus:border-jade-400"
      />
    </label>
  );
}
