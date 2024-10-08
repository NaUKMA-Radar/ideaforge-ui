import { atom } from 'jotai';
import { Comment, CommentStorageErrorsState, CreateCommentDto } from '../types/comments.types';
import { ActionCreatorOptions } from '../types/storage.types';
import axios, { HttpStatusCode } from 'axios';
import { selectedDocumentAtom } from './document.storage';
import { selectedParagraphAtom } from './paragraph.storage';

export const commentsAtom = atom<Comment[]>([]);
export const selectedCommentAtom = atom<Comment | null>(null);
export const commentStorageErrorsAtom = atom<CommentStorageErrorsState>({
  fetchAll: null,
  fetchOne: null,
  create: null,
  update: null,
  remove: null,
});

export const fetchAllAtom = atom(
  get => get(commentsAtom),
  async (get, set, options?: ActionCreatorOptions) => {
    set(commentStorageErrorsAtom, { ...get(commentStorageErrorsAtom), fetchAll: null });

    try {
      const response = await axios.get(`comments`);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(commentsAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(commentStorageErrorsAtom, {
        ...get(commentStorageErrorsAtom),
        fetchAll: error.response.data,
      });
    }
  },
);

export const fetchOneAtom = atom(
  get => get(selectedCommentAtom),
  async (get, set, id: Comment['id'], options?: ActionCreatorOptions) => {
    set(commentStorageErrorsAtom, { ...get(commentStorageErrorsAtom), fetchOne: null });

    try {
      const response = await axios.get(`comments/${id}`);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(commentsAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(commentStorageErrorsAtom, {
        ...get(commentStorageErrorsAtom),
        fetchOne: error.response.data,
      });
    }
  },
);

export const createAtom = atom(
  null,
  async (get, set, data: CreateCommentDto, options?: ActionCreatorOptions) => {
    set(commentStorageErrorsAtom, { ...get(commentStorageErrorsAtom), create: null });

    try {
      const response = await axios.post(`comments`, data);

      if (response.status === HttpStatusCode.Created) {
        set(commentsAtom, [...get(commentsAtom), response.data]);
        const selectedDocument = get(selectedDocumentAtom);

        if (selectedDocument) {
          options?.onSuccess?.(response.data);
          set(selectedDocumentAtom, {
            ...selectedDocument,
            paragraphs:
              selectedDocument?.paragraphs?.map(paragraph =>
                response.data.paragraph && paragraph.id === response.data.paragraph.id
                  ? { ...paragraph, comments: [...paragraph.comments, response.data] }
                  : paragraph,
              ) || [],
          });

          const selectedParagraph = get(selectedParagraphAtom);

          if (
            selectedParagraph &&
            response.data.paragraph?.id === selectedParagraph.id &&
            response.data.edition?.id
          ) {
            set(selectedParagraphAtom, {
              ...selectedParagraph,
              editions: [...(selectedParagraph.editions || []), response.data],
            });
          }
        }
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(commentStorageErrorsAtom, {
        ...get(commentStorageErrorsAtom),
        create: error.response.data,
      });
    }
  },
);
