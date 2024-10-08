import { atom } from 'jotai';
import {
  Paragraph,
  ParagraphStorageErrorsState,
  CreateParagraphDto,
  UpdateParagraphDto,
} from '../types/paragraphs.types';
import { ActionCreatorOptions } from '../types/storage.types';
import axios, { HttpStatusCode } from 'axios';
import { selectedDocumentAtom } from './document.storage';
import { Document } from '../types/documents.types';

export const paragraphsAtom = atom<Paragraph[]>([]);
export const selectedParagraphAtom = atom<Paragraph | null>(null);
export const paragraphStorageErrorsAtom = atom<ParagraphStorageErrorsState>({
  fetchAll: null,
  fetchOne: null,
  create: null,
  update: null,
  remove: null,
});
export const newParagraphPositionAtom = atom<{
  id: Paragraph['id'];
  position: 'before' | 'after';
} | null>(null);

// export const fetchAllAtom = atom(
//   get => get(paragraphsAtom),
//   async (get, set, options?: ActionCreatorOptions) => {
//     set(paragraphStorageErrorsAtom, { ...get(paragraphStorageErrorsAtom), fetchAll: null });

//     try {
//       const response = await axios.get(`paragraphs`);

//       if (response.status === HttpStatusCode.Ok) {
//         options?.onSuccess?.(response.data);
//         set(paragraphsAtom, response.data);
//       }
//     } catch (error: any) {
//       options?.onError?.(error.response.data);
//       set(paragraphStorageErrorsAtom, {
//         ...get(paragraphStorageErrorsAtom),
//         fetchAll: error.response.data,
//       });
//     }
//   },
// );
export const fetchByDocumentAtom = atom(
  get => get(selectedParagraphAtom),
  async (get, set, id: Document['id'], options?: ActionCreatorOptions) => {
    set(paragraphStorageErrorsAtom, { ...get(paragraphStorageErrorsAtom), fetchOne: null });
    try {
      const response = await axios.get(`paragraphs/${id}`);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(paragraphsAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(paragraphStorageErrorsAtom, {
        ...get(paragraphStorageErrorsAtom),
        fetchOne: error.response.data,
      });
    }
  },
);

export const fetchOneAtom = atom(
  get => get(selectedParagraphAtom),
  async (get, set, id: Paragraph['id'], options?: ActionCreatorOptions) => {
    set(paragraphStorageErrorsAtom, { ...get(paragraphStorageErrorsAtom), fetchOne: null });

    // Hard-coded paragraph data
    const hardCodedParagraph: Paragraph = {
      id: id,
      creatorId: "user123",
      content: "This is a sample paragraph content.",
      sysRank: 8.5,
      orderId: 1,
      isApproved: true,
      page: 1,
      grades: [
        { id: 1, grade: 9, competenceId: 1 },
        { id: 2, grade: 8, competenceId: 2 }
      ],
      document: {
        id: 1,
        name: "Sample Document",
        categoryId: 1,
        walletId: "wallet123",
        creatorId: "user456",
        cipher: "encrypted_content",
        isFinalised: false,
        description: "This is a sample document.",
        sysRank: 7.5,
        pageCount: 5,
        editorsNum: 3
      },
      editions: [
        {
          id: 1,
          creatorId: "user789",
          content: "This is the first edition of the paragraph.",
          sysRank: 7.0,
          ratings: []
        }
      ],
      comments: [
        {
          id: 1,
          creatorId: "user101",
          creatorName: "John Doe",
          content: "Great paragraph!",
          createdAt: new Date(),
          updatedAt: null
        }
      ],
      ratings: [
        { id: "rating1", sysRank: 8.0, competenceId: 1 },
        { id: "rating2", sysRank: 7.5, competenceId: 2 }
      ]
    };

    console.log(125, hardCodedParagraph)

    // Set the hard-coded data
    set(selectedParagraphAtom, hardCodedParagraph);
    options?.onSuccess?.(hardCodedParagraph);

    return hardCodedParagraph;
  },
);

export const createAtom = atom(
  null,
  async (get, set, data: CreateParagraphDto, options?: ActionCreatorOptions) => {
    set(paragraphStorageErrorsAtom, { ...get(paragraphStorageErrorsAtom), create: null });

    try {
      const response = await axios.post(`paragraphs`, data);

      if (response.status === HttpStatusCode.Created) {
        set(paragraphsAtom, [...get(paragraphsAtom), response.data]);
        const selectedDocument = get(selectedDocumentAtom);

        if (selectedDocument) {
          options?.onSuccess?.(response.data);
          set(selectedDocumentAtom, {
            ...selectedDocument,
            paragraphs: [...(selectedDocument.paragraphs || []), response.data],
          });
        }
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(paragraphStorageErrorsAtom, {
        ...get(paragraphStorageErrorsAtom),
        create: error.response.data,
      });
    }
  },
);

export const updateAtom = atom(
  null,
  async (
    get,
    set,
    id: Paragraph['id'],
    data: UpdateParagraphDto,
    options?: ActionCreatorOptions,
  ) => {
    set(paragraphStorageErrorsAtom, { ...get(paragraphStorageErrorsAtom), update: null });

    try {
      const response = await axios.put(`paragraphs/${id}`, data);

      if (response.status === HttpStatusCode.Ok) {
        set(
          paragraphsAtom,
          get(paragraphsAtom).map(paragraph => (paragraph.id === id ? response.data : paragraph)),
        );
        const selectedDocument = get(selectedDocumentAtom);

        if (selectedDocument) {
          options?.onSuccess?.(response.data);
          set(selectedDocumentAtom, {
            ...selectedDocument,
            paragraphs: (selectedDocument.paragraphs || []).map(paragraph =>
              paragraph.id === id ? response.data : paragraph,
            ),
          });
        }
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(paragraphStorageErrorsAtom, {
        ...get(paragraphStorageErrorsAtom),
        update: error.response.data,
      });
    }
  },
);

export const removeAtom = atom(
  null,
  async (get, set, id: Paragraph['id'], options?: ActionCreatorOptions) => {
    set(paragraphStorageErrorsAtom, { ...get(paragraphStorageErrorsAtom), remove: null });

    try {
      const response = await axios.delete(`paragraphs/${id}`);

      if (response.status === HttpStatusCode.Ok) {
        set(
          paragraphsAtom,
          get(paragraphsAtom).filter(paragraph => paragraph.id !== id),
        );
        const selectedDocument = get(selectedDocumentAtom);

        if (selectedDocument) {
          options?.onSuccess?.(response.data);
          set(selectedDocumentAtom, {
            ...selectedDocument,
            paragraphs: (selectedDocument.paragraphs || []).filter(
              paragraph => paragraph.id !== id,
            ),
          });
        }
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(paragraphStorageErrorsAtom, {
        ...get(paragraphStorageErrorsAtom),
        remove: error.response.data,
      });
    }
  },
);
