/**
 * Worker entry point.
 *
 * Only runs for `/api/*` (see `run_worker_first` in wrangler.jsonc); every other
 * request is served straight from the static assets, free and without invoking
 * this code.
 */

const MAX_FIELD = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== '/api/contact') {
      return env.ASSETS.fetch(request);
    }
    if (request.method !== 'POST') {
      return json({ ok: false, error: 'Method not allowed' }, 405);
    }

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return json({ ok: false, error: 'Malformed submission' }, 400);
    }

    const str = (key: string) => String(form.get(key) ?? '').trim().slice(0, MAX_FIELD);
    const name = str('name');
    const email = str('email');
    const message = str('message');

    // Honeypot: bots fill the hidden field. Answer 200 so they cannot tell.
    if (str('_gotcha')) return json({ ok: true });

    // The client validates too; this is the copy that actually counts.
    if (!name || !email || !message || !EMAIL_RE.test(email)) {
      return json({ ok: false, error: 'Please fill in every field with a valid email.' }, 400);
    }

    const text = [
      `From: ${name} <${email}>`,
      '',
      message,
      '',
      '—',
      'Sent from the contact form on davisbrown.dev',
    ].join('\n');

    try {
      await env.EMAIL.send({
        // The binding's `destination_address` restriction is the real guard —
        // even if this value were wrong, the send would fail rather than
        // deliver somewhere else.
        to: env.CONTACT_TO,
        from: { email: env.CONTACT_FROM, name: 'davisbrown.dev' },
        // Hitting reply in the mail client goes to whoever wrote in.
        replyTo: { email, name },
        subject: `Portfolio contact — ${name}`,
        text,
      });
    } catch (err) {
      // Logged to Workers Logs so a silently broken form is visible.
      console.error('contact form send failed', err);
      return json({ ok: false, error: 'Could not send. Please email directly.' }, 502);
    }

    return json({ ok: true });
  },
} satisfies ExportedHandler<Env>;
