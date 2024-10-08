import React, { useState, FormEvent, FC } from 'react';
import { Button, TextInput, TextareaInput, Avatar } from 'components/UI'; // Assuming these components exist
import PageHeader from 'components/ProjectDetails/PageHeader';
import { useAtom } from 'jotai';
import { projectAtom, projectsAtom, editProjectAtom } from 'storage/project/project.storage';
import { Project } from 'types/project.types';
import SkipButton from 'components/Project/SkipButton';

interface TeamMember {
    name: string;
    position: string;
    experience: string;
    photo: File | null;
}

const TeamView: FC<{ onProcess?: (updatedProject: Project) => void, onSkip: () => void }> = ({ onProcess, onSkip }) => {
    const [project, setProject] = useAtom(projectAtom);
    const [projects] = useAtom(projectsAtom);
    const [, editProject] = useAtom(editProjectAtom);
    
    const [team, setTeam] = useState<TeamMember[]>(
        project?.pitchdeck?.team ||
        [
            { name: '', position: '', experience: '', photo: null },
            { name: '', position: '', experience: '', photo: null },
            { name: '', position: '', experience: '', photo: null },
            { name: '', position: '', experience: '', photo: null },
        ]);

    const handleChange = (index: number, key: keyof TeamMember, value: string | File | null) => {
        setTeam(prev => {
            const updatedTeam = [...prev];
            updatedTeam[index] = { ...updatedTeam[index], [key]: value };
            return updatedTeam;
        });
    };

    const handlePhotoUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        handleChange(index, 'photo', file);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log("Team Data:", team);
        // Add save logic here, like calling an API or updating state in a higher component
        onProcess?.();
    };

    return (
        <form className="px-24 text-white" onSubmit={handleSubmit}>
            <PageHeader
                title='Team'
                subtitle='Now the last step of creating your fabulous pitch deck - enter all of your team details'
            />

            <div className="grid grid-cols-4 gap-8 mb-10">
                {team.map((member, index) => (
                    <div key={index} className="flex flex-col items-center space-y-4">
                        {/* Profile Photo */}
                        <Avatar />

                        {/* Name */}
                        <TextInput
                            placeholder="Name Surname"
                            className="!text-2xl text-center placeholder:text-white"
                            wrapperClass='!bg-grey-primary'
                            value={member.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                        />

                        {/* Position */}
                        <TextInput
                            placeholder="Position"
                            className="!text-2xl text-center placeholder:text-white"
                            value={member.position}
                            onChange={(e) => handleChange(index, 'position', e.target.value)}
                        />

                        {/* Experience */}
                        <TextareaInput
                            inputClassName='text-center !text-2xl placeholder:text-white'
                            placeholder="Experience"
                            defaultValue={member.experience}
                            onChange={(value) => handleChange(index, 'experience', value)}
                        />
                    </div>
                ))}
            </div>

            <div className="flex space-x-10">
                <Button
                    uppercase
                    type="submit"
                    size="md"
                    className="px-20 rounded-xl"
                >
                    Save
                </Button>
                <button
                    type="button"
                    className="border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-dark-primary rounded-xl px-8 py-3 font-[900] text-lg font-mono transition-all duration-1000"
                    onClick={() => alert('Invite mentor to validate')}
                >
                    Invite mentor to validate
                </button>
                <SkipButton onClick={() => onSkip?.()} />
            </div>
        </form>
    );
};

export default TeamView;
