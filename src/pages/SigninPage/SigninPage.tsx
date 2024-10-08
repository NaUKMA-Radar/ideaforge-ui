import Footer from 'components/Footer/Footer';
import { GithubIcon, GoogleIcon, XMarkIcon } from 'components/Icons/Icons';
import Navbar from 'components/Navbar/Navbar';
import { Button } from 'components/UI';
import { navbarLinks } from 'utils/app.utils';
import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApplicationRoutes } from '../../utils/app.utils';
import * as jose from 'jose';
import cookies from 'js-cookie';
import { useAuth } from '../../hooks/auth.hooks';
import { AuthMethods } from '../../enums/sign-in-methods.enum';
import { User } from '../../types/users.types';
// import PasswordInput from '../../components/PasswordInput/PasswordInput';
import axios from 'axios';
import { OAuthProviders } from '../../enums/oauth-providers.enum';

export interface SignInFormState {
  data: {
    email: User['email'];
    password: User['password'];
  };
  error?: any;
  isLoaded: boolean;
  isLoading: boolean;
}

const initialState: SignInFormState = {
  data: {
    email: '',
    password: '',
  },
  isLoaded: false,
  isLoading: false,
};

const SignInPage: FC = () => {
  const [state, setState] = useState(initialState);
  const { signInWithGoogle, signInWithCredentials } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLoaded) {
      setState({ ...state, isLoaded: true });
    }
  }, [state.isLoaded]);

  // useEffect(() => {
  //   if (cookies.get(import.meta.env.VITE_OAUTH_TOKEN_NAME)) {
  //     setState(prevState => ({ ...prevState, isLoading: true }));
  //     const oauthToken = cookies.get(import.meta.env.VITE_OAUTH_TOKEN_NAME);
  //     cookies.remove(import.meta.env.VITE_OAUTH_TOKEN_NAME, {
  //       path: '/',
  //       domain: import.meta.env.VITE_COOKIE_DOMAIN,
  //     });
  //     jose
  //       .jwtVerify(oauthToken || '', new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET))
  //       .then(result => {
  //         const payload = result.payload as any;

  //         if (payload.accessToken) {
  //           signInWithGoogle(
  //             { accessToken: payload.accessToken },
  //             {
  //               onSuccess: () => {
  //                 setState(prevState => ({ ...prevState, isLoading: false }));
  //                 navigate(ApplicationRoutes.Projects);
  //               },
  //               onError: () => {
  //                 setState(prevState => ({ ...prevState, isLoading: false }));
  //                 navigate(ApplicationRoutes.SignUp);
  //               },
  //             },
  //           );
  //         } else {
  //           setState({ ...state, error: { message: payload.error } });
  //           setState(prevState => ({ ...prevState, isLoading: false }));
  //         }
  //       });
  //   }
  // }, []);

  const validate = (data: SignInFormState['data']) => {
    if (!data.email?.trim()) {
      throw new Error('User email cannot be empty.');
    }

    if (!data.password?.trim()) {
      throw new Error('User password cannot be empty.');
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setState(prevState => ({ ...prevState, isLoading: true }));

    try {
      validate(state.data);
      signInWithCredentials(state.data, {
        onSuccess: () => {
          setState(prevState => ({ ...prevState, isLoading: false }));
          navigate(ApplicationRoutes.Projects);
        },
        onError: (error: any) => {
          setState({ ...state, error });
          setState(prevState => ({ ...prevState, isLoading: false }));
          console.log(error);
        },
      });
    } catch (error: any) {
      setState({ ...state, error });
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  const handleSignInWithOAuthProvider = useCallback(async (provider: OAuthProviders) => {
    const response = await axios.post(`/oauth/${provider}`, {
      referer: window.location.toString(),
    });

    window.location.href = response.data.url;
  }, []);

  return (
    <main className='flex flex-col items-center min-h-screen bg-white dark:bg-dark-primary'>
      <Navbar links={navbarLinks} className='sticky top-0 z-50 flex justify-center w-full' />
      <form
        onSubmit={event => {
          if (!state.isLoading) {
            handleSubmit(event);
          }
        }}
        className='flex flex-col flex-1 w-full max-w-xl p-10 mt-10 rounded-2xl'
      >
        <h5 className='text-white text-2xl min-[1920px]:text-3xl text-center'>
          Sign in or <Link to={ApplicationRoutes.SignUp} className="underline">Create an account</Link>
        </h5>
        <div className='flex flex-col gap-10 mt-10'>
          {state.error?.message && (
            <span className='inline-flex items-center justify-between px-3 py-2 text-red-500 border border-red-200 rounded-lg bg-red-50'>
              {state.error?.message}
              <span
                className='inline-flex p-2 transition-all duration-300 cursor-pointer hover:text-red-600'
                onClick={() => setState({ ...state, error: null })}
              >
                <XMarkIcon className='size-3 stroke-[5px]' />
              </span>
            </span>
          )}
          <input
            type='email'
            className='bg-transparent border-2 border-green-primary rounded-xl p-5 w-full text-2xl min-[1920px]:text-3xl outline-none text-white'
            placeholder='E-mail'
            value={state.data.email}
            onChange={(e) => setState(prevState => ({ ...prevState, data: { ...prevState.data, email: e.target.value } }))}
          />
          {/* <PasswordInput
            value={state.data.password}
            maxLength={255}
            placeholder='Password'
            className='bg-transparent border-2 border-green-primary rounded-xl p-5 w-full text-2xl min-[1920px]:text-3xl outline-none text-white'
            onChange={(e) => setState(prevState => ({ ...prevState, data: { ...prevState.data, password: e.target.value } }))}
          /> */}
          <input
            type='password'
            value={state.data.password}
            className='bg-transparent border-2 border-green-primary rounded-xl p-5 w-full text-2xl min-[1920px]:text-3xl outline-none text-white'
            placeholder='Password'
            onChange={(e) => setState(prevState => ({ ...prevState, data: { ...prevState.data, password: e.target.value } }))}
          />
        </div>
        <div className='grid grid-cols-1'>
          <Button
            type='submit'
            size='lg'
            className='mt-10 rounded-3xl'
            uppercase
            disabled={state.isLoading}
          >
            Sign in
          </Button>
        </div>
        <h5 className='text-white text-2xl min-[1920px]:text-3xl text-center my-10'>or</h5>
        <div className='flex flex-col self-center text-white gap-7'>
          <span 
            className='inline-flex items-center gap-5 cursor-pointer'
            onClick={() => handleSignInWithOAuthProvider(OAuthProviders.Google)}
          >
            <GoogleIcon className='size-8' />
            <span className='text-white text-2xl font-[400] underline'>Continue with Google</span>
          </span>
          <span className='inline-flex items-center gap-5 cursor-pointer'>
            <GithubIcon className='size-8' />
            <span className='text-white text-2xl font-[400] underline'>Continue with GitHub</span>
          </span>
        </div>
      </form>
      <Footer className='inline-flex relative h-[20px] w-full mt-[100px] p-10 justify-around bg-dark-secondary' />
    </main>
  );
};

export default SignInPage;