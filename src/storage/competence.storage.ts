import { atom } from 'jotai';
import {
  Competence,
  CompetenceStorageErrorsState,
  EmailCompetence,
} from '../types/competences.types';
import { ActionCreatorOptions } from '../types/storage.types';
import axios, { HttpStatusCode } from 'axios';
import { CreateCompetenceDto } from '../types/comments.types';

export const emailCompetencesAtom = atom<EmailCompetence[]>([]);
export const competencesAtom = atom<Competence[]>([]);
export const selectedCompetenceAtom = atom<Competence | null>(null);
export const competenceStorageErrorsAtom = atom<CompetenceStorageErrorsState>({
  fetchAll: null,
  fetchOne: null,
  create: null,
});

export const fetchAllAtom = atom(
  get => get(competencesAtom),
  async (get, set, options?: ActionCreatorOptions) => {
    set(competenceStorageErrorsAtom, { ...get(competenceStorageErrorsAtom), fetchAll: null });

    try {
      const response = await axios.get('competences');

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(competencesAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(competenceStorageErrorsAtom, {
        ...get(competenceStorageErrorsAtom),
        fetchAll: error.response.data,
      });
    }
  },
);

export const fetchEmailCompetenceAtom = atom(
  get => get(emailCompetencesAtom),
  async (get, set, options?: ActionCreatorOptions) => {
    set(competenceStorageErrorsAtom, { ...get(competenceStorageErrorsAtom), fetchAll: null });
    try {
      const response = await axios.get('competences/email');
      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(emailCompetencesAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(competenceStorageErrorsAtom, {
        ...get(competenceStorageErrorsAtom),
        fetchAll: error.response.data,
      });
    }
  },
);

export const fetchOneAtom = atom(
  get => get(selectedCompetenceAtom),
  async (get, set, id: Competence['id'], options?: ActionCreatorOptions) => {
    set(competenceStorageErrorsAtom, { ...get(competenceStorageErrorsAtom), fetchOne: null });

    try {
      const response = await axios.get(`competences/${id}`);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(selectedCompetenceAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(competenceStorageErrorsAtom, {
        ...get(competenceStorageErrorsAtom),
        fetchOne: error.response.data,
      });
    }
  },
);

export const createAtom = atom(
  null,
  async (get, set, data: CreateCompetenceDto, options?: ActionCreatorOptions) => {
    set(competenceStorageErrorsAtom, { ...get(competenceStorageErrorsAtom), create: null });
    try {
      const response = await axios.post(`competences`, data);
      if (response.status === HttpStatusCode.Created) {
        options?.onSuccess?.(response.data);
        set(competencesAtom, [...get(competencesAtom), response.data]);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(competenceStorageErrorsAtom, {
        ...get(competenceStorageErrorsAtom),
        create: error.response.data,
      });
    }
  },
);
