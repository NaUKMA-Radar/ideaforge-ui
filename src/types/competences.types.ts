import { Document } from './documents.types';
import { Project } from './projects.types';
import { Team } from './teams.types';

export interface EmailCompetence {
  email: string,
  competences: Competence[]
  sysRank?: number;
}
export interface Competence {
  id: number;
  name: string;
  teams?: Team[];
  projects?: Project[];
  documents?: Document[];
  sysRank?: number;
}

export interface CompetenceStorageErrorsState {
  fetchAll: any | null;
  fetchOne: any | null;
  create: any | null;
}
