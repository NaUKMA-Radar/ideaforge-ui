interface RatingInputProps {
    value?: number;
    onChange?: (rating: number) => void;
    disabled?: boolean;
    className?: string;
}

const RatingInput: React.FC<RatingInputProps> = ({
    value = 0,
    onChange,
    disabled = false,
    className = '',
}) => {
    const buttons = Array.from({ length: 10 }, (_, i) => i + 1);

    const handleClick = (rating: number) => {
        if (!disabled) {
            onChange?.(rating);
        }
    };

    const getButtonStyle = (rating: number) => {
        const fullRating = Math.floor(value);
        const fraction = value - fullRating;

        if (rating <= fullRating) {
            return 'bg-primary-gradient-half';
        } else if (rating === fullRating + 1 && fraction > 0) {
            console.log('fraction', fraction);
            return `bg-primary-gradient-half bg-[length:${fraction * 100}%_100%] bg-no-repeat`;
        }
        return 'border-gradient-primary bg-transparent';
    };

    return (
        <div className="flex space-x-3">
            {buttons.map((rating) => (
                <button
                    key={rating}
                    onClick={() => handleClick(rating)}
                    className={`
                        w-8 h-8
                        text-light-primary font-bold
                        rounded-[5px]
                        before:rounded-[5px]
                        ${getButtonStyle(rating)}
                    `}
                    disabled={disabled}
                >
                    {rating}
                </button>
            ))}
        </div>
    );
};

export default RatingInput;