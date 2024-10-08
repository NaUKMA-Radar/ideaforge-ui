import { FC, useState } from 'react';
import Modal from 'components/Modal/Modal';
import { Button } from 'components/UI';
import { toast } from 'react-toastify';

interface Mentor {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;  
    domains: string[];
    rate: string;
}

const mentors: Mentor[] = [
    {
        id: '1',
        username: 'mentor1',
        firstName: 'John',
        lastName: 'Doe',
        domains: ['domain1', 'domain2', 'domain3'],
        rate: '20$/h',
    },
    {
        id: '2',
        username: 'mentor2',
        firstName: 'Jorge',
        lastName: 'Washington',
        domains: ['domain1', 'domain2', 'domain3'],
        rate: '25$/h',
    },
    {
        id: '3',
        username: 'mentor3',
        firstName: 'Michael',
        lastName: 'Smith',
        domains: ['domain1', 'domain2', 'domain3'],
        rate: '25$/h',
    },
];

interface MentorModalProps {
    currentBalance: string;
    inviteToId: string; // The ID of the thing (project, task, etc.) you're inviting mentors to
    onClose: () => void;
}

const MentorModal: FC<MentorModalProps> = ({ currentBalance, inviteToId, onClose }) => {
    const [selectedMentors, setSelectedMentors] = useState<string[]>([]);

    const handleMentorSelect = (id: string) => {
        setSelectedMentors((prevSelectedMentors) =>
            prevSelectedMentors.includes(id)
                ? prevSelectedMentors.filter((mentorId) => mentorId !== id) // Deselect mentor if already selected
                : [...prevSelectedMentors, id] // Add mentor if not selected
        );
    };

    const handleSave = () => {
        if (selectedMentors.length) {
            toast.success(
                `The mentor${selectedMentors.length > 1 ? 's': ''} ${selectedMentors.map(
                    (id) => mentors.find((mentor) => mentor.id === id)?.username
                ).join(', ')} have been invited!`
            );
            onClose();
        } else {
            toast.info('No mentors selected.');
        }
    };

    return (
        <Modal
            title="Choose a mentor to validate:"
            titleClassName='!text-2xl font-normal font-sans !px-24'
            className='max-h-full max-w-[728px]'
            onClose={onClose}
        >
            <div className="flex flex-col gap-4 mt-8">
                {mentors.map((mentor) => (
                    <div
                        key={mentor.id}
                        className="flex items-center justify-between px-4 py-2 rounded-lg bg-grey-tertiary"
                    >
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={selectedMentors.includes(mentor.id)}
                                onChange={() => handleMentorSelect(mentor.id)}
                            />
                            <div>
                                <p className="text-white">@{mentor.username}</p>
                                <p className="text-sm text-gray-400">{mentor.domains.join(', ')}</p>
                            </div>
                        </label>
                        <p className="text-white">{mentor.rate}</p>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 mt-6 gap-x-8">
                <Button
                    type="button"
                    uppercase={true}
                    size="md"
                    className="px-20 rounded-2xl"
                    onClick={handleSave}
                >
                    save
                </Button>
                <p className="text-2xl text-green-primary">Your current project balance: {currentBalance}$</p>
            </div>
        </Modal>
    );
};

export default MentorModal;
