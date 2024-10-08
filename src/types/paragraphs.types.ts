import { Comment } from './comments.types';
import { Document } from './documents.types';
import { Grade, UpdateGradeDto } from './grades.types';
import { ParagraphEdition } from './paragraph-editions.types';
import { User } from './users.types';

export interface ParagraphCompetenceRank {
  id: string;
  sysRank: number;
  competenceId: number;
  paragraph?: Paragraph;
  edition?: ParagraphEdition;
}

export interface Paragraph {
  id: number;
  creatorId: User['id'];
  content: string;
  sysRank: number;
  orderId: number;
  isApproved: boolean;
  page: number;
  grades?: Grade[];
  document: Document;
  editions?: ParagraphEdition[];
  comments: Comment[];
  ratings: ParagraphCompetenceRank[];
}

export interface ParagraphStorageErrorsState {
  fetchAll: any | null;
  fetchOne: any | null;
  create: any | null;
  update: any | null;
  remove: any | null;
}

export interface CreateParagraphDto {
  creatorId: User['rateitId'];
  content: string;
  documentId: number;
  orderId: number;
}

export interface UpdateParagraphDto {
  content?: string;
  grades?: UpdateGradeDto[];
  isApproved?: boolean;
}
