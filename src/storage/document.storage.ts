import { atom } from 'jotai';
import { Document, DocumentStorageErrorsState } from '../types/documents.types';
import { ActionCreatorOptions } from '../types/storage.types';
import axios, { HttpStatusCode } from 'axios';
import { selectedProjectAtom } from './project/project.storage';
import { Project } from '../types/projects.types';

const sampleDocument: Document = {
  id: 1,
  categoryId: 1,
  name: "Test Project",
  walletId: "wallet123",
  creatorId: "user456",
  cipher: "encrypted_content_here",
  isFinalised: false,
  description: "This document outlines the project proposal for our new initiative.",
  sysRank: 8.5,
  pageCount: 5,
  editorsNum: 3,
  rewards: [
    { id: 1, name: "Early Contributor", value: 100 },
    { id: 2, name: "Quality Content", value: 150 }
  ],
  members: [
    { id: 1, email: "john@example.com", firstName: "John Doe" },
    { id: 2, email: "jane@example.com", firstName: "Jane Smith" }
  ],
  grades: [
    { id: 1, grade: 9, competenceId: 1 },
    { id: 2, grade: 8, competenceId: 2 }
  ],
  paragraphs: [
    { id: 1, content: "Introduction paragraph", orderId: 1 },
    { id: 2, content: "Main body paragraph 1", orderId: 2 },
    { id: 3, content: "Conclusion paragraph", orderId: 3 }
  ],
  competences: [
    { id: 1, name: "Project Management" },
    { id: 2, name: "Technical Writing" }
  ],
  editors: [
    { id: 3, email: "bob@example.com", firstName: "Bob Johnson" },
    { id: 4, email: "alice@example.com", firstName: "Alice Brown" }
  ],
  project: {
    id: 1,
    name: "Test Project",
    description: "A project to implement our new business initiative"
  },
  userRatingChange: [
    {
      email: "john@example.com",
      changes: [
        {
          id: 1,
          initValue: 7,
          finalValue: 9,
          competence: { id: 1, name: "Project Management" }
        }
      ]
    },
    {
      email: "jane@example.com",
      changes: [
        {
          id: 2,
          initValue: 6,
          finalValue: 8,
          competence: { id: 2, name: "Technical Writing" }
        }
      ]
    }
  ]
};


export const documentsAtom = atom<Document[]>([
  sampleDocument
]);
export const selectedDocumentAtom = atom<Document | null>(null);
export const documentStorageErrorsAtom = atom<DocumentStorageErrorsState>({
  fetchAll: null,
  fetchOne: null,
  create: null,
  update: null,
  remove: null,
});

export const fetchAllAtom = atom(
  get => get(documentsAtom),
  async (get, set, options?: ActionCreatorOptions) => {
    set(documentStorageErrorsAtom, { ...get(documentStorageErrorsAtom), fetchAll: null });

    try {
      const response = await axios.get(`documents`);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(documentsAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(documentStorageErrorsAtom, {
        ...get(documentStorageErrorsAtom),
        fetchAll: error.response.data,
      });
    }
  },
);
export const fetchByProjectAtom = atom(
  get => get(selectedDocumentAtom),
  async (get, set, id: Project['id'], options?: ActionCreatorOptions) => {
    set(documentStorageErrorsAtom, { ...get(documentStorageErrorsAtom), fetchOne: null });

    // Return the hard-coded sampleDocument
    const result = sampleDocument;
    
    options?.onSuccess?.(result);
    set(selectedDocumentAtom, result);

    console.log(121);
    return result;
  },
);

export const fetchOneAtom = atom(
  get => get(selectedDocumentAtom),
  async (get, set, id: Document['id'], page: number, options?: ActionCreatorOptions) => {
    set(documentStorageErrorsAtom, { ...get(documentStorageErrorsAtom), fetchOne: null });

    // Return the hard-coded sampleDocument
    const result = sampleDocument;
    
    options?.onSuccess?.(result);
    set(selectedDocumentAtom, result);

    return result;
  },
);

export const createAtom = atom(
  null,
  async (get, set, data: FormData, options?: ActionCreatorOptions) => {
    set(documentStorageErrorsAtom, { ...get(documentStorageErrorsAtom), create: null });

    try {
      const response = await axios.postForm(`documents`, data);

      if (response.status === HttpStatusCode.Created) {
        options?.onSuccess?.(response.data);
        set(documentsAtom, [...get(documentsAtom), response.data]);
        const selectedProject = get(selectedProjectAtom);

        if (selectedProject) {
          set(selectedProjectAtom, {
            ...selectedProject,
            documents: [...(selectedProject.documents || []), response.data],
          });
        }
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(documentStorageErrorsAtom, {
        ...get(documentStorageErrorsAtom),
        create: error.response.data,
      });
    }
  },
);

export const updateAtom = atom(
  null,
  async (get, set, id: Document['id'], data: FormData, options?: ActionCreatorOptions) => {
    set(documentStorageErrorsAtom, { ...get(documentStorageErrorsAtom), update: null });

    try {
      const response = await axios.putForm(`documents/${id}`, data);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(
          documentsAtom,
          get(documentsAtom).map(document =>
            document.id === id ? { ...response.data, paragraphs: document.paragraphs } : document,
          ),
        );
        set(selectedDocumentAtom, {
          ...response.data,
          paragraphs: get(selectedDocumentAtom)?.paragraphs || [],
        });
        const selectedProject = get(selectedProjectAtom);

        if (selectedProject) {
          set(selectedProjectAtom, {
            ...selectedProject,
            documents:
              selectedProject.documents?.map(document =>
                document.id === id ? response.data : document,
              ) || [],
          });
        }
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(documentStorageErrorsAtom, {
        ...get(documentStorageErrorsAtom),
        update: error.response.data,
      });
    }
  },
);

export const removeAtom = atom(
  null,
  async (get, set, id: Document['id'], options?: ActionCreatorOptions) => {
    set(documentStorageErrorsAtom, { ...get(documentStorageErrorsAtom), remove: null });

    try {
      const response = await axios.delete(`documents/${id}`);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(
          documentsAtom,
          get(documentsAtom).filter(document => document.id !== id),
        );
        set(selectedDocumentAtom, null);
        const selectedProject = get(selectedProjectAtom);

        if (selectedProject) {
          set(selectedProjectAtom, {
            ...selectedProject,
            documents: selectedProject.documents?.filter(document => document.id !== id) || [],
          });
        }
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(documentStorageErrorsAtom, {
        ...get(documentStorageErrorsAtom),
        remove: error.response.data,
      });
    }
  },
);
