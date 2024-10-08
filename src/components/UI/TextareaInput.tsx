import React from 'react';

interface TextareaInputProps {
    id?: string;
    title?: string;
    titleType?: 'default' | 'fancy'; // Type of title: default or fancy
    defaultValue?: string;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    titleClassName?: string;
    wrapperClassName?: string;
    onChange?: (value: string) => any;
}

const TextareaInput: React.FC<TextareaInputProps> = ({ id, title = '', defaultValue = '', titleType = 'default', placeholder = '', className = '', inputClassName = '', titleClassName = '', wrapperClassName = '', onChange = () => { } }) => {
    const titleDefaultClassName = titleType === 'fancy' ? 'text-white text-2xl text-center font-[600] w-full bg-grey-primary py-2 border-gradient-primary rounded-[20px] before:rounded-[20px] rounded-[20px]' : 'text-white text-lg font-[600] mb-2'
    return (
        <div className={`flex flex-col items-start space-y-4 ${className}`}>
            {
                title &&
                <div className='w-full'>
                    <h2 className={`${titleDefaultClassName}${titleClassName}`}>{title}</h2>
                </div>
            }

            {/* Textarea input */}
            <div className={`w-full border-gradient-primary rounded-[20px] before:rounded-[20px] ${wrapperClassName}`}>
                <textarea
                    id={id}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={e => onChange(e.target.value)}
                    className={`w-full h-48 p-4 text-white outline-none resize-none bg-transparent ${inputClassName}`}
                />
            </div>
        </div>
    );
};

export default TextareaInput;
