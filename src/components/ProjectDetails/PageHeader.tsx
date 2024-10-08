import { Title } from 'components/UI';
import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle: string;
    className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, className = '' }) => {
    return (
        <div className={className}>
            <Title className='text-center'>{title}</Title>
            <p className="pb-10 text-2xl text-white">{subtitle}</p>
        </div>
    );
};

export default PageHeader;
