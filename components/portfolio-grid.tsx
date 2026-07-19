import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { PortfolioProject } from '@/lib/data';

export function PortfolioGrid({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className="archivegrid">
      {projects.map((project, index) => (
        <article className={project.featured ? 'archivecard featured' : 'archivecard'} key={project.name}>
          <div className={project.image ? 'archivevisual' : 'archivevisual typographic'}>
            {project.image ? (
              <Image src={project.image} alt={`Aperçu de la réalisation ${project.name}`} fill sizes={project.featured ? '(max-width: 900px) 100vw, 66vw' : '(max-width: 900px) 100vw, 33vw'} />
            ) : (
              <><span>{project.name}</span><i>YMKEN / {String(index + 1).padStart(2, '0')}</i></>
            )}
          </div>
          <div className="archivecopy">
            <p>{project.category}</p>
            <h3>{project.name}</h3>
            <span>{project.intervention}</span>
            <p>{project.description}</p>
            <ArrowUpRight aria-hidden="true" />
          </div>
        </article>
      ))}
    </div>
  );
}
