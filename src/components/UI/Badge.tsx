import React from 'react';

interface LabelProps {
    className?: string;
    children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ className = '', children }) => {
    return (
        <div className={`text-white text-center mt-1 bg-grey-primary border-gradient-primary rounded-[20px] before:rounded-[20px] ${className}`}>
            {children}
        </div>
    );
};

export default Label;
