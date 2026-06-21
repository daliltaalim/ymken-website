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
    return response.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  try {
    const brevoApiKey = process.env.BREVO_API_KEY;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!brevoApiKey) {
      return sendErrorResponse(response, 500, 'Missing BREVO_API_KEY');
    }

    if (!contactToEmail) {
      return sendErrorResponse(response, 500, 'Missing CONTACT_TO_EMAIL');
    }

    if (!contactFromEmail) {
      return sendErrorResponse(response, 500, 'Missing CONTACT_FROM_EMAIL');
    }

    const body = request.body ?? {};
    const name = body.name ?? body.fullName;
    const { email, service, message, phone, company } = body;

    const missingField = getMissingRequiredField({ name, email, service, message });

    if (missingField) {
      return response.status(400).json({ success: false, error: `Missing ${missingField}` });
    }

    const contactName = String(name).trim();
    const contactEmail = String(email).trim();
    const requestedService = String(service).trim();
    const contactMessage = String(message).trim();

    const htmlContent = `
      <h1>Nouvelle demande de contact</h1>
      <p><strong>Nom :</strong> ${escapeHtml(contactName)}</p>
      <p><strong>Email :</strong> ${escapeHtml(contactEmail)}</p>
      <p><strong>Service :</strong> ${escapeHtml(requestedService)}</p>
      ${formatOptionalField('Téléphone', phone)}
      ${formatOptionalField('Entreprise', company)}
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(contactMessage).replace(/\n/g, '<br />')}</p>
    `;

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
          email: contactEmail,
          name: contactName,
        },
        subject: `Nouvelle demande de contact - ${requestedService}`,
        htmlContent,
      }),
    });

    if (!brevoResponse.ok) {
      const brevoError = await brevoResponse.text();
      console.error('Contact API error:', new Error(`Brevo request failed with status ${brevoResponse.status}: ${brevoError}`));
      return response.status(502).json({
        success: false,
        error: 'Brevo request failed',
        status: brevoResponse.status,
        details: brevoError,
      });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return response.status(500).json({ success: false, error: getErrorMessage(error) });
  }
}

function sendErrorResponse(response: VercelResponse, statusCode: number, message: string) {
  const error = new Error(message);
  console.error('Contact API error:', error);
  return response.status(statusCode).json({ success: false, error: message });
}

function getMissingRequiredField(fields: Record<string, unknown>) {
  for (const [field, value] of Object.entries(fields)) {
    if (typeof value !== 'string' || value.trim() === '') {
      return field;
    }
  }

  return null;
}

function formatOptionalField(label: string, value: unknown) {
  if (typeof value !== 'string' || value.trim() === '') {
    return '';
  }

  return `<p><strong>${label} :</strong> ${escapeHtml(value)}</p>`;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Unexpected contact API error';
}

function escapeHtml(value: unknown) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
