import type { ComponentProps, ReactNode } from 'react';
import { getWhatsAppUrl } from '@/lib/config';

type Props = Omit<ComponentProps<'a'>, 'href'> & {
  children: ReactNode;
  fallbackHref?: string;
};

export function WhatsAppLink({ children, fallbackHref = '/contact', ...props }: Props) {
  const href = getWhatsAppUrl();

  if (!href) {
    return <a href={fallbackHref} {...props}>{children}</a>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
