import { atom } from 'jotai';
import { User } from '../types/users.types';
import { ActionCreatorOptions } from '../types/storage.types';
import axios, { HttpStatusCode } from 'axios';
import { AccountRegistrationData, AuthErrorsState, SignInPayload } from '../types/auth.types';
import { AuthMethods } from '../enums/sign-in-methods.enum';

export const authenticatedUserAtom = atom<User | null>(null);
export const authErrorsAtom = atom<AuthErrorsState>({
  fetchAuthenticatedUser: null,
  login: null,
  register: null,
  refresh: null,
  logout: null,
});

export const fetchAuthenticatedUserAtom = atom(
  get => get(authenticatedUserAtom),
  async (get, set, options?: ActionCreatorOptions) => {
    set(authErrorsAtom, { ...get(authErrorsAtom), fetchAuthenticatedUser: null });

    try {
      const response = await axios.get(`auth/user`);

      if (response.status === HttpStatusCode.Ok) {
        options?.onSuccess?.(response.data);
        set(authenticatedUserAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(authErrorsAtom, {
        ...get(authErrorsAtom),
        fetchAuthenticatedUser: 'Cannot fetch authenticated user',
      });
    }
  },
);

export const registerAtom = atom(
  null,
  async (
    get,
    set,
    authMethod: AuthMethods,
    data: AccountRegistrationData,
    options?: ActionCreatorOptions,
  ) => {
    set(authErrorsAtom, { ...get(authErrorsAtom), register: null });

    try {
      const response = await axios.post(`auth/register`, {
        ...data,
        registrationMethod: authMethod,
      });

      if (response.status === HttpStatusCode.Created) {
        options?.onSuccess?.(response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(authErrorsAtom, { ...get(authErrorsAtom), register: error.response.data });
    }
  },
);

const loginAtom = atom(
  null,
  async (
    get,
    set,
    authMethod: AuthMethods,
    data: SignInPayload,
    options?: ActionCreatorOptions,
  ) => {
    set(authErrorsAtom, { ...get(authErrorsAtom), login: null });

    try {
      const response = await axios.post(`auth/login/${authMethod}`, data);

      if (response.status === HttpStatusCode.Created) {
        options?.onSuccess?.(response.data);
        set(authenticatedUserAtom, response.data);
      }
    } catch (error: any) {
      options?.onError?.(error.response.data);
      set(authErrorsAtom, { ...get(authErrorsAtom), login: error.response.data });
    }
  },
);

export const loginWithCredentialsAtom = atom(
  null,
  async (
    _,
    set,
    data: Pick<Required<SignInPayload>, 'email' | 'password'>,
    options?: ActionCreatorOptions,
  ) => {
    set(loginAtom, AuthMethods.Credentials, data, options);
  },
);

export const loginWithGoogleAtom = atom(
  null,
  async (
    _,
    set,
    data: Pick<Required<SignInPayload>, 'accessToken'>,
    options?: ActionCreatorOptions,
  ) => {
    set(loginAtom, AuthMethods.Google, data, options);
  },
);

export const refreshAtom = atom(null, async (get, set, options?: ActionCreatorOptions) => {
  set(authErrorsAtom, { ...get(authErrorsAtom), refresh: null });

  try {
    const response = await axios.post(`auth/refresh`);

    if (response.status === HttpStatusCode.Created) {
      options?.onSuccess?.(response.data);
    }
  } catch (error: any) {
    options?.onError?.(error.response.data);
    set(authErrorsAtom, { ...get(authErrorsAtom), refresh: error.response.data });
  }
});

export const logoutAtom = atom(null, async (get, set, options?: ActionCreatorOptions) => {
  set(authErrorsAtom, { ...get(authErrorsAtom), logout: null });

  try {
    const response = await axios.post(`auth/logout`);

    if (response.status === HttpStatusCode.Created) {
      options?.onSuccess?.(response.data);
      set(authenticatedUserAtom, null);
    }
  } catch (error: any) {
    options?.onError?.(error.response.data);
    set(authErrorsAtom, { ...get(authErrorsAtom), logout: error.response.data });
  }
});
