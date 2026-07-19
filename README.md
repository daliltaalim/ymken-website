# YMKEN Solutions — site officiel

Site vitrine premium de l’agence digitale YMKEN Solutions, développé avec Next.js (App Router), TypeScript et Tailwind CSS.

## Arborescence

- `/` — proposition de valeur, expertises, méthode, différenciation et projets
- `/agence` — histoire, vision, mission, valeurs et mot du fondateur
- `/services` — développement, IA, marketing digital et conseil
- `/realisations` — portfolio limité aux projets réels
- `/contact` — formulaire de qualification et coordonnées
- `/api/contact` — validation serveur et envoi transactionnel Brevo

L’architecture `app/`, `components/` et `lib/` permet d’ajouter ensuite blog, études de cas, solutions et produits SaaS sans restructuration.

## Direction artistique

L’identité associe un bleu nuit institutionnel aux bleus YMKEN (`#0070C0`, `#0090E0`, `#004090`). Une grille éditoriale, des compositions orbitales et le contraste entre la typographie Manrope et les accents Playfair donnent au site un caractère technologique, humain et distinctif. Les interactions restent légères et respectent `prefers-reduced-motion`.

## Composants principaux

- `Header`, `Footer`, navigation mobile et bouton WhatsApp
- `PageHero`, `CTA`, `Eyebrow` et grilles projets réutilisables
- formulaire client avec états, validation HTML et route serveur validée par Zod
- données de navigation, services et réalisations centralisées dans `lib/data.ts`

## Démarrage

```bash
npm install
cp .env.example .env.local
npm run dev
```

Variables nécessaires :

- `BREVO_API_KEY` : clé serveur Brevo (jamais exposée au navigateur)
- `BREVO_SENDER_EMAIL` : expéditeur vérifié dans Brevo
- `CONTACT_TO_EMAIL` : destinataire des demandes
- `NEXT_PUBLIC_WHATSAPP_NUMBER` : numéro WhatsApp international sans `+`

## Production

```bash
npm run typecheck
npm run build
npm start
```

Le projet est configuré pour Vercel. Le sitemap, le fichier robots, les métadonnées Open Graph et les données structurées locales sont générés par Next.js.
