type VercelRequest = {
  method?: string;
  body?: Record<string, unknown>;
};

type VercelResponse = {
  setHeader(name: string, value: string): void;
  status(statusCode: number): { json(body: unknown): void };
};

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!brevoApiKey || !contactToEmail || !contactFromEmail) {
    return response.status(500).json({ error: 'Contact service is not configured.' });
  }

  const { name, email, service, message } = request.body ?? {};

  if (!name || !email || !service || !message) {
    return response.status(400).json({ error: 'Missing required fields.' });
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
    return response.status(502).json({ error: 'Unable to send contact email.' });
  }

  return response.status(200).json({ success: true });
}

function escapeHtml(value: unknown) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
