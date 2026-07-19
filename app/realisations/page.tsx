import type { Metadata } from 'next';
import { CTA, Eyebrow, PageHero, ProjectGrid } from '@/components/ui';
import { PortfolioGrid } from '@/components/portfolio-grid';
import { portfolioProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Réalisations',
  description: 'Découvrez les sites, plateformes, interfaces et missions digitales réalisés par YMKEN Solutions.',
};

export default function Realisations() {
  return (
    <>
      <PageHero
        label="Réalisations"
        title={<>Une histoire digitale.<br />Des projets <em>bien réels.</em></>}
        text="Développement, plateformes, acquisition et communication : découvrez une sélection du patrimoine historique de YMKEN Solutions."
      />
      <section className="portfoliointro section">
        <div className="shell">
          <div className="sectionhead">
            <div>
              <Eyebrow dark>Réalisations & missions historiques</Eyebrow>
              <h2>Notre savoir-faire,<br /><em>mis en pratique.</em></h2>
            </div>
            <p>Une sélection issue de la présentation officielle de l’agence. Nous décrivons les interventions documentées, sans résultats ni technologies supposés.</p>
          </div>
          <div className="portfoliolegend" aria-label="Catégories représentées">
            <span>Développement Web</span><span>Applications & Plateformes</span><span>Marketing Digital</span><span>Communication & Design</span>
          </div>
          <PortfolioGrid projects={portfolioProjects} />
        </div>
      </section>
      <section className="innovation section">
        <div className="shell">
          <div className="sectionhead">
            <div>
              <Eyebrow dark>Produits & innovations YMKEN</Eyebrow>
              <h2>Des idées portées<br /><em>de l’intérieur.</em></h2>
            </div>
            <p>Des produits numériques développés ou portés par YMKEN, distincts des missions réalisées pour nos clients.</p>
          </div>
          <ProjectGrid />
        </div>
      </section>
      <CTA />
    </>
  );
}
