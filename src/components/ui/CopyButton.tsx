'use client';

import { useState } from 'react';

import { Icon } from './Icons';

export function CopyButton({ text, label = 'Copy prompt' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API is unavailable (insecure context) — the prompt is still
      // visible on screen and selectable, so this is a soft failure.
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-sand-300 px-4 py-2 text-[0.8125rem] font-semibold text-jade-800 transition hover:bg-sand-100"
    >
      {copied ? (
        <>
          <Icon.check className="h-4 w-4" aria-hidden />
          Copied
        </>
      ) : (
        <>
          <Icon.copy className="h-4 w-4" aria-hidden />
          {label}
        </>
      )}
    </button>
  );
}
