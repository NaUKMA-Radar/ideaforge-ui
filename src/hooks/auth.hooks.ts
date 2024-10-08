import { useAtom } from 'jotai';
import {
  authErrorsAtom,
  fetchAuthenticatedUserAtom,
  loginWithCredentialsAtom,
  loginWithGoogleAtom,
  logoutAtom,
  refreshAtom,
  registerAtom,
} from '../storage/auth.storage';

export const useAuth = () => {
  const [authenticatedUser, fetchLatestAuthInfo] = useAtom(fetchAuthenticatedUserAtom);
  const [errors] = useAtom(authErrorsAtom);
  const [_loginWithCredentials, signInWithCredentials] = useAtom(loginWithCredentialsAtom);
  const [_loginWithGoogle, signInWithGoogle] = useAtom(loginWithGoogleAtom);
  const [_register, signUp] = useAtom(registerAtom);
  const [_logout, signOut] = useAtom(logoutAtom);
  const [_refresh, refresh] = useAtom(refreshAtom);

  return {
    authenticatedUser,
    errors,
    refresh,
    signInWithCredentials,
    signInWithGoogle,
    signUp,
    signOut,
    fetchLatestAuthInfo,
  };
};
