import { Competence } from './competences.types';
import { Document } from './documents.types';
import { Project } from './projects.types';
import { Team } from './teams.types';

export interface User {
  id: number;
  rateitId: string;
  password: string | null;
  email: string;
  image: string;
  teams?: Team[];
  projects?: Project[];
  documents?: Document[];
  competences?: Competence[];

}

export interface UserStorageErrorsState {
  fetchAll: any | null;
  fetchOne: any | null;
  create: any | null;
  update: any | null;
  remove: any | null;
}
