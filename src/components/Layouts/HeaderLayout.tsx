import React from 'react';
import Navbar, { NavbarLink } from '../Navbar/Navbar';
import { navbarLinks } from 'utils/app.utils';

interface HeaderLayoutProps {
    children: React.ReactNode;
    links?: NavbarLink[];
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children, links = navbarLinks }) => {
    return (
        <div className="flex flex-col max-h-screen">
            <Navbar
                links={links}
                className='sticky top-0 z-50 flex justify-center w-full'
            />
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
};

export default HeaderLayout;
