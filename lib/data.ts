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

export type PortfolioProject = {
  name: string;
  category: 'Développement Web' | 'Applications & Plateformes' | 'Marketing Digital' | 'Communication & Design';
  intervention: string;
  description: string;
  image?: string;
  featured?: boolean;
};

// Patrimoine historique documenté dans la présentation officielle YMKEN.
// Aucune technologie ni performance n'est attribuée sans information source.
export const portfolioProjects: PortfolioProject[] = [
  { name: 'Coozzy', category: 'Applications & Plateformes', intervention: 'Produit web responsive', description: 'Portail immobilier facilitant la mise en relation entre loueurs et locataires, avec matching, messagerie, visites et listes de souhaits.', image: '/assets/portfolio-coozzy.svg', featured: true },
  { name: 'Good Talents', category: 'Applications & Plateformes', intervention: 'Interface d’administration', description: 'Interface métier consacrée au pilotage des candidatures, de la facturation et de la classification des CV.', image: '/assets/portfolio-good-talents.svg', featured: true },
  { name: 'Wizee', category: 'Développement Web', intervention: 'Plateforme de formation & expérience digitale', description: 'Expérience pédagogique structurée pour présenter les parcours et accompagner une communauté d’apprenants.', image: '/assets/portfolio-wizee.svg' },
  { name: 'Wall Street English', category: 'Marketing Digital', intervention: 'Acquisition & génération de leads', description: 'Conception de campagnes digitales associant ciblage, messages promotionnels et acquisition de prospects.', image: '/assets/portfolio-wall-street.svg' },
  { name: 'Lyautey Square', category: 'Communication & Design', intervention: 'Communication digitale', description: 'Accompagnement de la présence et des supports de communication digitale.' },
  { name: 'Raed', category: 'Développement Web', intervention: 'Site internet', description: 'Conception d’une présence web professionnelle et de ses parcours de consultation.' },
  { name: 'Margafrique', category: 'Communication & Design', intervention: 'Communication digitale', description: 'Création et déclinaison de contenus pour la communication numérique.' },
  { name: 'Immo Autrement', category: 'Développement Web', intervention: 'Site internet', description: 'Conception d’une expérience web dédiée à l’activité immobilière.' },
  { name: 'Somerci', category: 'Développement Web', intervention: 'Site internet', description: 'Conception et réalisation d’une présence digitale professionnelle.' },
  { name: 'Delta Hygiène', category: 'Communication & Design', intervention: 'Communication digitale', description: 'Accompagnement éditorial et visuel de la communication numérique.' },
  { name: "COM'SUP", category: 'Marketing Digital', intervention: 'Réseaux sociaux & communication', description: 'Accompagnement de la communication digitale et des prises de parole sur les réseaux sociaux.' },
  { name: 'Samira Haddouchi', category: 'Communication & Design', intervention: 'Identité & communication digitale', description: 'Création de supports destinés à structurer une présence numérique cohérente.' },
];
