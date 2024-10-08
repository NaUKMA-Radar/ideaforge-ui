import { atom } from 'jotai';
import { ActionCreatorOptions } from '../types/storage.types';
import axios, { HttpStatusCode } from 'axios';
import { User, UserStorageErrorsState } from '../types/users.types';
import { Competence } from '../types/competences.types';

export const usersAtom = atom<User[]>([]);
export const selectedUserAtom = atom<User | null>(null);
export const userStorageErrorsAtom = atom<UserStorageErrorsState>({
  fetchAll: null,
  fetchOne: null,
  create: null,
  update: null,
  remove: null,
});

export const fetchAllAtom = atom(
  get => get(usersAtom),
  async (get, set, options?: ActionCreatorOptions) => {
    set(userStorageErrorsAtom, { ...get(userStorageErrorsAtom), fetchAll: null });
    try {
      const response = await axios.get(`users`);
      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(usersAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(userStorageErrorsAtom, {
        ...get(userStorageErrorsAtom),
        fetchAll: error.response.data,
      });
    }
  },
);

export const fetchOneAtom = atom(
  get => get(selectedUserAtom),
  async (get, set, id: User['id'], options?: ActionCreatorOptions) => {
    set(userStorageErrorsAtom, { ...get(userStorageErrorsAtom), fetchOne: null });

    try {
      const response = await axios.get(`users/${id}`);
      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(selectedUserAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(userStorageErrorsAtom, {
        ...get(userStorageErrorsAtom),
        fetchOne: error.response.data,
      });
    }
  },
);

export const createAtom = atom(
  null,
  async (get, set, data: FormData, options?: ActionCreatorOptions) => {
    set(userStorageErrorsAtom, { ...get(userStorageErrorsAtom), create: null });
    try {
      const response = await axios.postForm(`users`, data);
      if (response.status === HttpStatusCode.Created) {
        options?.onSuccess?.(response.data);
        set(usersAtom, [...get(usersAtom), response.data]);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(userStorageErrorsAtom, {
        ...get(userStorageErrorsAtom),
        create: error.response.data,
      });
    }
  },
);

export const updateAtom = atom(
  null,
  async (get, set, id: User['id'], data: FormData, options?: ActionCreatorOptions) => {
    set(userStorageErrorsAtom, { ...get(userStorageErrorsAtom), update: null });

    try {
      const response = await axios.putForm(`users/${id}`, data);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(
          usersAtom,
          get(usersAtom).map(project => (project.id === id ? response.data : project)),
        );
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(userStorageErrorsAtom, {
        ...get(userStorageErrorsAtom),
        update: error.response.data,
      });
    }
  },
);

export const deleteUserCompetenceAtom = atom(
  null,
  async (
    get,
    set,
    userId: User['id'],
    competenceId: Competence['id'],
    options?: ActionCreatorOptions,
  ) => {
    set(userStorageErrorsAtom, { ...get(userStorageErrorsAtom), remove: null });
    try {
      console.log(userId);
      const response = await axios.delete(`competences/${competenceId}`);
      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);

        const selectedUser = get(selectedUserAtom);

        if (selectedUser) {
          set(selectedUserAtom, {
            ...selectedUser,
            competences:
              selectedUser.competences?.filter(competence => competence.id !== competenceId) || [],
          });
        }
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(userStorageErrorsAtom, {
        ...get(userStorageErrorsAtom),
        remove: error.response.data,
      });
    }
  },
);
