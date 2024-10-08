import { atom } from 'jotai';
import {
  ParagraphEdition,
  ParagraphEditionStorageErrorsState,
  CreateParagraphEditionDto,
  UpdateParagraphEditionDto,
} from '../types/paragraph-editions.types';
import { ActionCreatorOptions } from '../types/storage.types';
import axios, { HttpStatusCode } from 'axios';
import { selectedParagraphAtom } from './paragraph.storage';
import { Paragraph } from '../types/paragraphs.types';

export const paragraphEditionsAtom = atom<ParagraphEdition[]>([]);
export const paragraphEditionsForParagraphAtom = atom<ParagraphEdition[]>([]);
export const selectedParagraphEditionAtom = atom<ParagraphEdition | null>(null);
export const paragraphEditionStorageErrorsAtom = atom<ParagraphEditionStorageErrorsState>({
  fetchAll: null,
  fetchOne: null,
  fetchAllForParagraph: null,
  create: null,
  update: null,
  remove: null,
});

export const fetchAllAtom = atom(
  get => get(paragraphEditionsAtom),
  async (get, set, options?: ActionCreatorOptions) => {
    set(paragraphEditionStorageErrorsAtom, {
      ...get(paragraphEditionStorageErrorsAtom),
      fetchAll: null,
    });

    try {
      const response = await axios.get(`paragraph-editions`);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(paragraphEditionsAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(paragraphEditionStorageErrorsAtom, {
        ...get(paragraphEditionStorageErrorsAtom),
        fetchAll: error.response.data,
      });
    }
  },
);

export const fetchOneAtom = atom(
  get => get(selectedParagraphEditionAtom),
  async (get, set, id: ParagraphEdition['id'], options?: ActionCreatorOptions) => {
    set(paragraphEditionStorageErrorsAtom, {
      ...get(paragraphEditionStorageErrorsAtom),
      fetchOne: null,
    });

    try {
      const response = await axios.get(`paragraph-editions/${id}`);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(paragraphEditionsAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(paragraphEditionStorageErrorsAtom, {
        ...get(paragraphEditionStorageErrorsAtom),
        fetchOne: error.response.data,
      });
    }
  },
);

export const fetchAllForParagraphAtom = atom(
  get => get(paragraphEditionsForParagraphAtom),
  async (get, set, id: Paragraph['id'], options?: ActionCreatorOptions) => {
    set(paragraphEditionStorageErrorsAtom, {
      ...get(paragraphEditionStorageErrorsAtom),
      fetchAllForParagraph: null,
    });

    // Hard-coded data
    const hardCodedParagraphEditions: ParagraphEdition[] = [
      {
        id: 1,
        creatorId: "user123",
        content: "This is the first edition of the paragraph.",
        sysRank: 7.5,
        grades: [
          { id: 1, grade: 8, competenceId: 1 },
          { id: 2, grade: 7, competenceId: 2 }
        ],
        paragraph: { id: id, content: "Original paragraph content", orderId: 1 },
        comments: [
          { id: 1, creatorId: "user456", creatorName: "John Doe", content: "Great first edition!" }
        ],
        ratings: [
          { id: "rating1", sysRank: 7.5, competenceId: 1 },
          { id: "rating2", sysRank: 7.0, competenceId: 2 }
        ]
      },
      {
        id: 2,
        creatorId: "user789",
        content: "This is the second edition of the paragraph with some improvements.",
        sysRank: 8.0,
        grades: [
          { id: 3, grade: 9, competenceId: 1 },
          { id: 4, grade: 8, competenceId: 2 }
        ],
        paragraph: { id: id, content: "Original paragraph content", orderId: 1 },
        comments: [
          { id: 2, creatorId: "user101", creatorName: "Jane Smith", content: "Nice improvements!" }
        ],
        ratings: [
          { id: "rating3", sysRank: 8.0, competenceId: 1 },
          { id: "rating4", sysRank: 7.5, competenceId: 2 }
        ]
      }
    ];

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Set the hard-coded data
    set(paragraphEditionsForParagraphAtom, hardCodedParagraphEditions);
    options?.onSuccess?.(hardCodedParagraphEditions);

    return hardCodedParagraphEditions;
  },
);

export const updateAtom = atom(
  null,
  async (
    get,
    set,
    id: ParagraphEdition['id'],
    data: UpdateParagraphEditionDto,
    options?: ActionCreatorOptions,
  ) => {
    set(paragraphEditionStorageErrorsAtom, {
      ...get(paragraphEditionStorageErrorsAtom),
      update: null,
    });

    try {
      const response = await axios.put(`paragraph-editions/${id}`, data);

      if (response.status === HttpStatusCode.Ok) {
        set(
          paragraphEditionsAtom,
          get(paragraphEditionsAtom).map(edition => (edition.id === id ? response.data : edition)),
        );
        const selectedParagraph = get(selectedParagraphAtom);

        if (selectedParagraph) {
          options?.onSuccess?.(response.data);
          set(selectedParagraphAtom, {
            ...selectedParagraph,
            editions: (selectedParagraph.editions || []).map(edition =>
              edition.id === id ? response.data : edition,
            ),
          });
        }
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(paragraphEditionStorageErrorsAtom, {
        ...get(paragraphEditionStorageErrorsAtom),
        update: error.response.data,
      });
    }
  },
);

export const createAtom = atom(
  null,
  async (get, set, data: CreateParagraphEditionDto, options?: ActionCreatorOptions) => {
    set(paragraphEditionStorageErrorsAtom, {
      ...get(paragraphEditionStorageErrorsAtom),
      create: null,
    });

    try {
      const response = await axios.post(`paragraph-editions`, data);

      if (response.status === HttpStatusCode.Created) {
        set(paragraphEditionsAtom, [...get(paragraphEditionsAtom), response.data]);
        const selectedParagraph = get(selectedParagraphAtom);

        if (selectedParagraph) {
          options?.onSuccess?.(response.data);
          set(selectedParagraphAtom, {
            ...selectedParagraph,
            editions: [...(selectedParagraph.editions || []), response.data],
          });
        }
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(paragraphEditionStorageErrorsAtom, {
        ...get(paragraphEditionStorageErrorsAtom),
        create: error.response.data,
      });
    }
  },
);

export const removeAtom = atom(
  null,
  async (get, set, id: ParagraphEdition['id'], options?: ActionCreatorOptions) => {
    set(paragraphEditionStorageErrorsAtom, {
      ...get(paragraphEditionStorageErrorsAtom),
      remove: null,
    });

    try {
      const response = await axios.delete(`paragraph-editions/${id}`);

      if (response.status === HttpStatusCode.Ok) {
        set(
          paragraphEditionsAtom,
          get(paragraphEditionsAtom).filter(paragraphEdition => paragraphEdition.id !== id),
        );
        const selectedParagraph = get(selectedParagraphAtom);

        if (selectedParagraph) {
          options?.onSuccess?.(response.data);
          set(selectedParagraphAtom, {
            ...selectedParagraph,
            editions: (selectedParagraph.editions || []).filter(
              paragraphEdition => paragraphEdition.id !== id,
            ),
          });
        }
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(paragraphEditionStorageErrorsAtom, {
        ...get(paragraphEditionStorageErrorsAtom),
        remove: error.response.data,
      });
    }
  },
);
