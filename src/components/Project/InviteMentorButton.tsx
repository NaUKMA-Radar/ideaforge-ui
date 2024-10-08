import { FC, useState } from 'react';
import MentorModal from './InviteMentorModal'; // Import the modal component
import { createPortal } from 'react-dom';

interface InviteMentorButtonProps {
    inviteToId: string; // Prop for the thing ID to invite mentors to
}

const InviteMentorButton: FC<InviteMentorButtonProps> = ({ inviteToId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInviteClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                type="button"
                className="border-2 border-green-primary text-green-primary uppercase hover:bg-green-primary hover:text-dark-primary rounded-2xl px-4 py-3 font-[900] text-lg font-mono transition-all duration-1000"
                onClick={handleInviteClick}
            >
                Invite mentor to validate
            </button>

            {isModalOpen &&
                createPortal(
                    <MentorModal
                        inviteToId={inviteToId}
                        currentBalance="1234"
                        onClose={handleModalClose}
                    />,
                    document.querySelector('body')!,
                )
            }
        </>
    );
};

export default InviteMentorButton;
