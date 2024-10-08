import { FC, useState } from 'react';
import Modal, { ModalProps } from 'components/Modal/Modal'; // Assuming you already have a Modal component
import { Button } from 'components/UI'; // Assuming you already have a Button component
import TextareaInput from 'components/UI/TextareaInput';

interface AnswerModalProps extends ModalProps {
    answer: string; // The current answer to be displayed as default value
    onUpdate: (newAnswer: string) => void; // Function to update the answer
}

const AnswerModal: FC<AnswerModalProps> = ({ answer, onUpdate, ...props }) => {
    const [currentAnswer, setCurrentAnswer] = useState<string>(answer);

    const handleSave = () => {
        console.log('currentAnswer', currentAnswer)
        onUpdate(currentAnswer); // Call the update function with the new answer
        props.onClose?.(); // Close the modal if there's a close function in props
    };

    return (
        <Modal
            title="Enter your answer:"
            titleClassName="!text-2xl font-normal font-sans !px-24"
            className="md:max-w-[629px]"
            {...props}
        >
            <div className="flex flex-col p-6">
                <TextareaInput
                    defaultValue={currentAnswer}
                    onChange={(value) => setCurrentAnswer(value)}
                    inputClassName="bg-transparent"
                />
                <Button
                    uppercase={true}
                    className="px-16 mt-5 font-mono transition-all duration-1000 w-min rounded-2xl"
                    onClick={handleSave}
                >
                    Save
                </Button>
            </div>
        </Modal>
    );
};

export default AnswerModal;
