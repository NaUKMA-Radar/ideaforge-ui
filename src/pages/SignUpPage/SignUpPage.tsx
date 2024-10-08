import Footer from 'components/Footer/Footer';
import { GithubIcon, GoogleIcon } from 'components/Icons/Icons';
import Navbar from 'components/Navbar/Navbar';
import { Button } from 'components/UI';
import { navbarLinks } from 'utils/app.utils';
import { FC, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApplicationRoutes } from '../../utils/app.utils';
import * as jose from 'jose';
import cookies from 'js-cookie';
import { useAuth } from '../../hooks/auth.hooks';
import { AuthMethods } from '../../enums/sign-in-methods.enum';
import { User } from '../../types/users.types';

export interface SignUpFormState {
  data: {
    email: User['email'];
    password: User['password'];
  };
  error?: any;
  isLoaded: boolean;
  isLoading: boolean;
}

const initialState: SignUpFormState = {
  data: {
    email: '',
    password: '',
  },
  isLoaded: false,
  isLoading: false,
};

const SignUpPage: FC = () => {
  const [state, setState] = useState(initialState);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLoaded) {
      setState({ ...state, isLoaded: true });
    }
  }, [state.isLoaded]);

  useEffect(() => {
    if (cookies.get(import.meta.env.VITE_OAUTH_TOKEN_NAME)) {
      setState(prevState => ({ ...prevState, isLoading: true }));
      const oauthToken = cookies.get(import.meta.env.VITE_OAUTH_TOKEN_NAME);
      cookies.remove(import.meta.env.VITE_OAUTH_TOKEN_NAME, {
        path: '/',
        domain: import.meta.env.VITE_COOKIE_DOMAIN,
      });
      jose
        .jwtVerify(oauthToken || '', new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET))
        .then(result => {
          const payload = result.payload as any;

          if (payload.accessToken) {
            signUp(
              AuthMethods.Google,
              { email: payload.email },
              {
                onSuccess: () => {
                  setState(prevState => ({ ...prevState, isLoading: false }));
                  navigate(ApplicationRoutes.SignIn);
                },
                onError: error => {
                  setState({ ...state, error });
                  setState(prevState => ({ ...prevState, isLoading: false }));
                },
              },
            );
          } else {
            setState({ ...state, error: { message: payload.error } });
            setState(prevState => ({ ...prevState, isLoading: false }));
          }
        });
    }
  }, []);
  const validate = (data: SignUpFormState['data']) => {
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
      signUp(AuthMethods.Credentials, state.data, {
        onSuccess: () => {
          setState(prevState => ({ ...prevState, isLoading: false }));
          navigate(ApplicationRoutes.SignIn);
        },
        onError: error => {
          setState(prevState => ({ ...prevState, isLoading: false }));
          setState({ ...state, error });
        },
      });
    } catch (error: any) {
      setState({ ...state, error });
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  
  return (
    <main className='flex flex-col items-center min-h-screen bg-white dark:bg-dark-primary'>
      <Navbar links={navbarLinks} className='sticky top-0 z-50 flex justify-center w-full' />
      <form onSubmit={handleSubmit} className='flex flex-col flex-1 w-full max-w-xl p-10 mt-10 rounded-2xl'>
        <h5 className='text-white text-2xl min-[1920px]:text-3xl text-center'>
          Sign up or <Link to={ApplicationRoutes.SignIn} className="underline">Log in</Link>
        </h5>
        <div className='flex flex-col gap-10 mt-10 '>
          <input
            type='email'
            className='bg-transparent border-2 border-green-primary rounded-xl p-5 w-full text-2xl min-[1920px]:text-3xl outline-none text-white'
            placeholder='E-mail'
          />
          <input
            type='password'
            className='bg-transparent border-2 border-green-primary rounded-xl p-5 w-full text-2xl min-[1920px]:text-3xl outline-none text-white'
            placeholder='Password'
          />
        </div>
        <div className='grid grid-cols-1'>
          <Button
            type='submit'
            size='lg'
            className='mt-10 rounded-3xl'
            uppercase
          >
            Sign up
          </Button>
        </div>
        <h5 className='text-white text-2xl min-[1920px]:text-3xl text-center my-10'>or</h5>
        <div className='flex flex-col self-center text-white gap-7'>
          <span className='inline-flex items-center gap-5 cursor-pointer'>
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

export default SignUpPage;
