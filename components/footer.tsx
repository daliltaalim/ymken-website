import Link from 'next/link';
import { ArrowUpRight, Facebook, Linkedin, MapPin, MessageCircle } from 'lucide-react';
import { company } from '@/lib/config';
import { nav } from '@/lib/data';
import { Logo } from './logo';
import { WhatsAppLink } from './whatsapp-link';

export function Footer() {
  return (
    <footer>
      <div className="shell footergrid">
        <div className="footbrand">
          <Logo light />
          <p>Nous construisons les outils digitaux qui permettent aux entreprises de grandir.</p>
          <span><MapPin size={16} /> {company.location}</span>
        </div>
        <div>
          <b>Navigation</b>
          {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
        <div>
          <b>Expertises</b>
          <Link href="/services">Développement web</Link>
          <Link href="/services">Intelligence artificielle</Link>
          <Link href="/services">Marketing digital</Link>
          <Link href="/services">Conseil & stratégie</Link>
        </div>
        <div>
          <b>Parlons-nous</b>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={company.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={14} /> Facebook</a>
          <a href={company.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={14} /> LinkedIn</a>
          <WhatsAppLink><MessageCircle size={14} /> WhatsApp</WhatsAppLink>
        </div>
      </div>
      <div className="shell footbase">
        <span>© {new Date().getFullYear()} {company.name}. Tous droits réservés.</span>
        <span>Conçu avec exigence à Casablanca <ArrowUpRight size={14} /></span>
      </div>
    </footer>
  );
}
