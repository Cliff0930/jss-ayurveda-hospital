import { NextResponse } from 'next/server';

/**
 * Enquiry form endpoint.
 *
 * Validates the submission, drops obvious bot traffic, then forwards it to
 * whatever delivery mechanism is configured:
 *
 *   ENQUIRY_WEBHOOK_URL — any HTTP endpoint (Resend, Formspree, n8n, Zapier,
 *                         a WordPress REST route, …). The full payload is
 *                         POSTed as JSON.
 *
 * With no webhook configured the submission is logged server-side and the user
 * still gets a success response, so the form is usable in development without
 * external services.
 */

const MAX_LENGTHS = { name: 120, phone: 32, email: 160, subject: 160, message: 4000 } as const;

type Payload = Record<string, unknown>;

function asString(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Respond 200 so it learns nothing.
  if (asString(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const enquiry = {
    name: asString(body.name, MAX_LENGTHS.name),
    phone: asString(body.phone, MAX_LENGTHS.phone),
    email: asString(body.email, MAX_LENGTHS.email),
    subject: asString(body.subject, MAX_LENGTHS.subject) || 'General enquiry',
    message: asString(body.message, MAX_LENGTHS.message),
  };

  if (!enquiry.name || !enquiry.phone || !enquiry.email) {
    return NextResponse.json(
      { ok: false, error: 'Please provide your name, phone number and email address.' },
      { status: 422 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(enquiry.email)) {
    return NextResponse.json(
      { ok: false, error: 'That email address does not look right — please check it.' },
      { status: 422 },
    );
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...enquiry,
          to: process.env.ENQUIRY_TO_EMAIL ?? 'contact@jssamch.org',
          receivedAt: new Date().toISOString(),
          source: 'jssayurvedahospital.org — website enquiry form',
        }),
      });

      if (!response.ok) throw new Error(`Delivery endpoint responded ${response.status}`);
    } catch (error) {
      console.error('[enquiry] delivery failed:', error);
      return NextResponse.json(
        {
          ok: false,
          error: 'We could not send your message right now. Please call us on 0821-2548231.',
        },
        { status: 502 },
      );
    }
  } else {
    console.info('[enquiry] no ENQUIRY_WEBHOOK_URL configured — logging only:', enquiry);
  }

  return NextResponse.json({ ok: true });
}
