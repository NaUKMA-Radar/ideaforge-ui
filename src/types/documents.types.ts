import { Competence } from './competences.types';
import { Grade } from './grades.types';
import { Paragraph } from './paragraphs.types';
import { Project } from './projects.types';
import { User } from './users.types';

export interface UserRatingChange {
  id: number;
  initValue: number;
  finalValue?: number;
  competence: Competence;
}
export interface Document {
  id: number;
  categoryId: number;
  name: string;
  walletId: string;
  creatorId: string;
  cipher: string;
  isFinalised: boolean;
  description: string;
  sysRank: number;
  pageCount: number;
  editorsNum: number;
  rewards?: any[];
  members?: User[];
  grades?: Grade[];
  paragraphs?: Paragraph[];
  competences?: Competence[];
  editors?: User[];
  project?: Project;
  userRatingChange?: { email: string, changes: UserRatingChange[] }[];
}

export interface DocumentStorageErrorsState {
  fetchAll: any | null;
  fetchOne: any | null;
  create: any | null;
  update: any | null;
  remove: any | null;
}
