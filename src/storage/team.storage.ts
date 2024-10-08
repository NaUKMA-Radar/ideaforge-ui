import { atom } from 'jotai';
import { Team, TeamStorageErrorsState } from '../types/teams.types';
import { ActionCreatorOptions } from '../types/storage.types';
import axios, { HttpStatusCode } from 'axios';

export const teamsAtom = atom<Team[]>([]);

export const selectedTeamAtom = atom<Team | null>();
export const teamStorageErrorsAtom = atom<TeamStorageErrorsState>({
  fetchAll: null,
  fetchOne: null,
  create: null,
  update: null,
  remove: null,
});

export const fetchAllAtom = atom(
  get => get(teamsAtom),
  async (get, set, options?: ActionCreatorOptions) => {
    set(teamStorageErrorsAtom, { ...get(teamStorageErrorsAtom), fetchAll: null });

    try {
      const response = await axios.get('teams');
      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(teamsAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(teamStorageErrorsAtom, {
        ...get(teamStorageErrorsAtom),
        fetchAll: error.response.data,
      });
    }
  },
);

export const fetchOneAtom = atom(
  get => get(selectedTeamAtom),
  async (get, set, id: Team['id'], options?: ActionCreatorOptions) => {
    set(teamStorageErrorsAtom, { ...get(teamStorageErrorsAtom), fetchOne: null });

    try {
      const response = await axios.get(`teams/${id}`);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(selectedTeamAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(teamStorageErrorsAtom, {
        ...get(teamStorageErrorsAtom),
        fetchOne: error.response.data,
      });
    }
  },
);

export const createAtom = atom(
  null,
  async (get, set, data: FormData, options?: ActionCreatorOptions) => {
    set(teamStorageErrorsAtom, { ...get(teamStorageErrorsAtom), create: null });

    try {
      const response = await axios.postForm(`teams`, data);

      if (response.status === HttpStatusCode.Created) {
        options?.onSuccess?.(response.data);
        set(teamsAtom, [...get(teamsAtom), response.data]);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(teamStorageErrorsAtom, {
        ...get(teamStorageErrorsAtom),
        create: error.response.data,
      });
    }
  },
);

export const updateAtom = atom(
  null,
  async (get, set, id: Team['id'], data: FormData, options?: ActionCreatorOptions) => {
    set(teamStorageErrorsAtom, { ...get(teamStorageErrorsAtom), update: null });

    try {
      const response = await axios.putForm(`teams/${id}`, data);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(
          teamsAtom,
          get(teamsAtom).map(team => (team.id === id ? response.data : team)),
        );

        const selectedTeam = get(selectedTeamAtom);

        if (selectedTeam) {
          set(selectedTeamAtom, { ...response.data, projects: selectedTeam.projects });
        }
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(teamStorageErrorsAtom, {
        ...get(teamStorageErrorsAtom),
        update: error.response.data,
      });
    }
  },
);

export const removeAtom = atom(
  null,
  async (get, set, id: Team['id'], options?: ActionCreatorOptions) => {
    set(teamStorageErrorsAtom, { ...get(teamStorageErrorsAtom), remove: null });

    try {
      const response = await axios.delete(`teams/${id}`);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(
          teamsAtom,
          get(teamsAtom).filter(team => team.id !== id),
        );

        const selectedTeam = get(selectedTeamAtom);

        if (selectedTeam) {
          set(selectedTeamAtom, null);
        }
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(teamStorageErrorsAtom, {
        ...get(teamStorageErrorsAtom),
        remove: error.response.data,
      });
    }
  },
);
