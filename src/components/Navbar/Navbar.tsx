import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ApplicationRoutes } from 'utils/app.utils';

export interface NavbarLink {
  name: string;
  to: ApplicationRoutes;
}

export interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  links: NavbarLink[];
  showLogo?: boolean;
}

const Navbar: FC<NavbarProps> = ({ links, showLogo = true, ...props }) => {
  const ref = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current as HTMLElement;
      const scrollListener = () => setScrolled(element.offsetTop > 0);

      document.addEventListener('scroll', scrollListener);

      return () => {
        document.removeEventListener('scroll', scrollListener);
      };
    }
  }, [ref.current]);

  return (
    <div
      {...props}
      className={`${props.className ? props.className : `flex w-full sticky top-0`} ${scrolled ? 'bg-zinc-900 backdrop-blur-xl bg-opacity-5' : ''}`}
      ref={ref}
    >
      <div className='flex w-full px-32 items-center'>
        <div className='flex min-w-[150px] items-center'>
          {showLogo && (
            <Link to={ApplicationRoutes.Root}>
              <img src='/images/logo.png' className='w-[100px]' />
            </Link>
          )}
        </div>
        <nav className='flex gap-10 justify-center items-center flex-1'>
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className='text-white py-10 px-5 font-[600] text-2xl cursor-pointer transition-all duration-300 hover:text-green-primary'
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className='flex min-w-[150px]'>
          <Link
            to={ApplicationRoutes.SignUp}
            className='inline-flex text-center items-center justify-center rounded-xl ring-1 ring-green-primary px-5 py-2 text-green-primary font-[900] text-lg hover:bg-green-primary hover:text-dark-primary transition-all duration-300'
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
