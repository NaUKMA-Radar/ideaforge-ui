import React from 'react';

interface SkipButtonProps {
    onClick: () => void
    label?: string;
    className?: string
}

const SkipButton: React.FC<SkipButtonProps> = ({ onClick, label = "Skip", className = "" }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`bg-grey-primary font-mono text-white text-lg px-6 py-3 rounded-lg transition-all duration-300 font-[600] ${className}`}
        >
            {label}
        </button>
    );
};

export default SkipButton;
