import { ParagraphEdition } from './paragraph-editions.types';
import { Paragraph } from './paragraphs.types';
import { User } from './users.types';

export interface Comment {
  id: number;
  creatorId: User['id'];
  creatorName: string;
  content: string;
  paragraph?: Paragraph;
  edition?: ParagraphEdition;
}

export interface CommentStorageErrorsState {
  fetchAll: any | null;
  fetchOne: any | null;
  create: any | null;
  update: any | null;
  remove: any | null;
}

export interface CreateCommentDto {
  creatorId: User['rateitId'];
  creatorName: string;
  content: string;
  paragraphId: number;
  editionId?: number;
}


export interface CreateCompetenceDto {
  name: string;

}

