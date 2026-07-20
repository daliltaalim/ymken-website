import { z } from 'zod';

type VercelRequest = {
  method?: string;
  body?: Record<string, unknown>;
};

type VercelResponse = {
  setHeader(name: string, value: string): void;
  status(statusCode: number): { json(body: unknown): void };
};

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  service: z.string().trim().min(1).max(100),
  message: z.string().trim().min(10).max(5000),
  phone: z.string().trim().max(30).optional(),
  company: z.string().trim().max(150).optional(),
});

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  try {
    const brevoApiKey = process.env.BREVO_API_KEY;
    const senderEmail =
      process.env.BREVO_SENDER_EMAIL ||
      process.env.CONTACT_FROM_EMAIL;
    const recipientEmail = process.env.CONTACT_TO_EMAIL;

    if (!brevoApiKey) {
      return sendErrorResponse(response, 500, 'Missing BREVO_API_KEY');
    }

    if (!recipientEmail) {
      return sendErrorResponse(response, 500, 'Missing CONTACT_TO_EMAIL');
    }

    if (!senderEmail) {
      return sendErrorResponse(response, 500, 'Missing BREVO_SENDER_EMAIL or CONTACT_FROM_EMAIL');
    }

    const body = request.body ?? {};
    const validation = contactSchema.safeParse({
      ...body,
      name: body.name ?? body.fullName,
    });

    if (!validation.success) {
      return response.status(400).json({
        success: false,
        error: 'Veuillez vérifier les informations du formulaire.',
        fields: validation.error.flatten().fieldErrors,
      });
    }

    const {
      name: contactName,
      email: contactEmail,
      service: requestedService,
      message: contactMessage,
      phone,
      company,
    } = validation.data;

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
          email: senderEmail,
          name: 'YMKEN Solutions',
        },
        to: [{ email: recipientEmail }],
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
        error: 'Le message n’a pas pu être envoyé. Veuillez réessayer.',
      });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return response.status(500).json({ success: false, error: 'Une erreur est survenue. Veuillez réessayer.' });
  }
}

function sendErrorResponse(response: VercelResponse, statusCode: number, message: string) {
  const error = new Error(message);
  console.error('Contact API error:', error);
  return response.status(statusCode).json({ success: false, error: message });
}

function formatOptionalField(label: string, value: unknown) {
  if (typeof value !== 'string' || value.trim() === '') {
    return '';
  }

  return `<p><strong>${label} :</strong> ${escapeHtml(value)}</p>`;
}

function escapeHtml(value: unknown) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
