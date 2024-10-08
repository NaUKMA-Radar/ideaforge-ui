import { Comment } from './comments.types';
import { Document } from './documents.types';
import { Grade, UpdateGradeDto } from './grades.types';
import { Paragraph, ParagraphCompetenceRank } from './paragraphs.types';
import { User } from './users.types';

export interface ParagraphEdition {
  id: number;
  creatorId: User['rateitId'];
  content: string;
  sysRank: number;
  grades?: Grade[];
  paragraph?: Paragraph;
  comments?: Comment[];
  document?: Document
  ratings: ParagraphCompetenceRank[];
}

export interface ParagraphEditionStorageErrorsState {
  fetchAll: any | null;
  fetchOne: any | null;
  fetchAllForParagraph: any | null;
  create: any | null;
  update: any | null;
  remove: any | null;
}

export interface CreateParagraphEditionDto {
  creatorId: User['rateitId'];
  content: string;
  paragraphId: number;
}

export interface UpdateParagraphEditionDto {
  content?: string;
  grades?: UpdateGradeDto[];
}