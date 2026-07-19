export const company = {
  name: 'YMKEN Solutions',
  founder: 'Nadi Tarik',
  founderRole: 'Fondateur / Président',
  email: 'contact@ymken.com',
  supportEmail: 'support@ymken.com',
  phone: '066357039',
  location: 'Casablanca, Maroc',
  facebook: 'https://web.facebook.com/ymkensolutions',
  linkedin: 'https://www.linkedin.com/company/ymken-solution',
} as const;

export const whatsappMessage =
  'Bonjour YMKEN Solutions, je souhaite discuter de mon projet digital.';

/**
 * Returns a wa.me URL only when an international number has been configured.
 * The 9-digit local number supplied to YMKEN is deliberately not guessed.
 */
export function getWhatsAppUrl() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '');

  if (!number) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessage)}`;
}
