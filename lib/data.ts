import { Bot, BrainCircuit, ChartNoAxesCombined, Code2, Globe2, Megaphone, Search, ServerCog, Sparkles, Workflow } from 'lucide-react';

export const nav = [{ href: '/', label: 'Accueil' }, { href: '/agence', label: 'L’Agence' }, { href: '/services', label: 'Services' }, { href: '/realisations', label: 'Réalisations' }, { href: '/contact', label: 'Contact' }];
export const services = [
  { icon: Globe2, title: 'Sites web', text: 'Des expériences rapides, accessibles et pensées pour convertir.' },
  { icon: Code2, title: 'Applications web', text: 'Des produits métier robustes, intuitifs et évolutifs.' },
  { icon: ServerCog, title: 'Solutions SaaS', text: 'De l’idée au produit cloud prêt à accompagner votre croissance.' },
  { icon: BrainCircuit, title: 'Intelligence artificielle', text: 'L’IA intégrée à vos outils pour créer une valeur concrète.' },
  { icon: Workflow, title: 'Automatisation', text: 'Des processus connectés pour gagner du temps et en fiabilité.' },
  { icon: Megaphone, title: 'Marketing digital', text: 'Une acquisition structurée autour de vos objectifs commerciaux.' },
  { icon: Search, title: 'SEO', text: 'Une visibilité durable sur les recherches qui comptent.' },
  { icon: ChartNoAxesCombined, title: 'Media Ads', text: 'Meta et Google Ads pilotés avec méthode et transparence.' },
  { icon: Bot, title: 'Assistants intelligents', text: 'Des agents utiles, sécurisés et adaptés à vos usages.' },
  { icon: Sparkles, title: 'Conseil digital', text: 'Une feuille de route claire pour transformer votre organisation.' },
];
export const projects = [
  { slug: 'dalil-taalim', name: 'Dalil Taalim', type: 'Plateforme éducative', text: 'Un produit numérique conçu pour faciliter l’accès à l’information et guider les parcours dans l’écosystème éducatif.', tags: ['Produit', 'UX/UI', 'Web'], tone: 'cyan' },
  { slug: 'tiqati', name: 'TIQATI', type: 'Solution digitale', text: 'Une solution interne pensée autour de la confiance, de la clarté des parcours et d’une expérience accessible.', tags: ['Stratégie', 'Design', 'Technologie'], tone: 'blue' },
];
