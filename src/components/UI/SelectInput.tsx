import React from 'react';

interface SelectInputProps {
    id?: string;
    options?: { value: string; label: string }[]; // Array of options with value and label
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: string;
    className?: string;
    children?: React.ReactNode;
}

const SelectInput: React.FC<SelectInputProps> = ({ id, options, onChange, value, className = '', children }) => {
    return (
        <div className='w-full mt-1 h-11 border-gradient-primary rounded-[20px] before:rounded-[20px]'>
            <select
                id={id}
                value={value || ''}
                onChange={onChange}
                className={`px-4 py-px outline-none bg-transparent text-white font-[600] text-lg w-full h-full ${className}`}
            >
                {
                    children || (
                        <>
                            <option hidden disabled value="">
                            </option>
                            {options?.map((option, index) => (
                                <option key={index} value={option.value} className="text-dark-primary">
                                    {option.label}
                                </option>
                            ))}
                        </>
                    )
                }
            </select>
        </div>
    );
};

export default SelectInput;
