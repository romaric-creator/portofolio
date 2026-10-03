import { useMemo } from 'react';
import { useTranslation } from './context';
import { PROJECTS } from '../data/projects';

export function useLocalizedProjects() {
  const { t } = useTranslation();
  return useMemo(() =>
    PROJECTS.map(p => ({
      ...p,
      tagline: t.projects.items[p.id]?.tagline ?? p.tagline,
      description: t.projects.items[p.id]?.description ?? p.description,
      caseStudy: t.projects.items[p.id]?.caseStudy ?? (p as any).caseStudy,
    })),
    [t]
  );
}
