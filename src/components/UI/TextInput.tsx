import React from 'react';

interface TextInputProps {
    value?: string;
    defaultValue?: string;
    id?: string;
    placeholder?: string;
    type?: string;
    className?: string;
    wrapperClass?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
    value,
    defaultValue,
    id,
    placeholder = '',
    type = 'text',
    className = '',
    wrapperClass = '',
    onChange
    }) => {
    return (
        <div className={`w-full mt-1 border-gradient-primary rounded-[20px] before:rounded-[20px] ${wrapperClass}`}>
            <input
                value={value}
                defaultValue={defaultValue}
                id={id}
                type={type}
                placeholder={placeholder}
                className={`w-full px-4 py-px outline-none bg-transparent text-white font-[600] text-lg ${className}`}
                onChange={onChange}
            />
        </div>
    );
};

export default TextInput;
