const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

type VercelRequest = {
  method?: string;
  body?: unknown;
};

type VercelResponse = {
  status: (statusCode: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
};

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  try {
    const brevoApiKey = process.env.BREVO_API_KEY;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!brevoApiKey || !contactToEmail || !contactFromEmail) {
      return response.status(500).json({ success: false, error: 'Contact service is not configured.' });
    }

    const body = parseBody(request.body);
    const name = normalizeField(body.name);
    const email = normalizeField(body.email);
    const service = normalizeField(body.service);
    const message = normalizeField(body.message);

    if (!name || !email || !service || !message) {
      return response.status(400).json({ success: false, error: 'Missing required fields.' });
    }

    const brevoResponse = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          email: contactFromEmail,
          name: 'YMKEN Solutions',
        },
        to: [{ email: contactToEmail }],
        replyTo: {
          email,
          name,
        },
        subject: `Nouvelle demande de contact - ${service}`,
        htmlContent: `
          <h1>Nouvelle demande de contact</h1>
          <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p><strong>Email :</strong> ${escapeHtml(email)}</p>
          <p><strong>Service :</strong> ${escapeHtml(service)}</p>
          <p><strong>Message :</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
        `,
      }),
    });

    if (!brevoResponse.ok) {
      return response.status(502).json({ success: false, error: 'Unable to send contact email.' });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ success: false, error: 'Unable to process contact request.' });
  }
}

function parseBody(body: unknown): ContactPayload {
  if (typeof body === 'string') {
    return JSON.parse(body) as ContactPayload;
  }

  if (body && typeof body === 'object') {
    return body as ContactPayload;
  }

  return {};
}

function normalizeField(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
