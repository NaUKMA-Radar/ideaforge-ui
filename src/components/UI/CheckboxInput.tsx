import React from 'react';

interface CheckboxInputProps {
    id: string;
    checked?: boolean;
    size?: 'sm' | 'md';
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const sizeClasses = {
    sm: 'w-[20px]',
    md: 'w-[30px]'
};

const CheckboxInput: React.FC<CheckboxInputProps> = ({
    id,
    checked = false,
    size = 'sm', // Default size
    className = '',
    onChange
}) => {
    return (
    <input
        id={id}
        type='checkbox'
        checked={checked}
        className={`inline-flex outline-none border-none ${sizeClasses[size]} ${className}`}
        onChange={onChange}
    />
    );
};

export default CheckboxInput;
