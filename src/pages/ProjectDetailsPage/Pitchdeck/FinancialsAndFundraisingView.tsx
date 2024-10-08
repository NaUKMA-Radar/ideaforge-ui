import { Button, Title } from 'components/UI';
import TextareaInput from 'components/UI/TextareaInput';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { editProjectAtom, projectAtom, projectsAtom } from 'storage/project/project.storage';
import { Project } from 'types/project.types';
import SkipButton from 'components/Project/SkipButton';

const FinancialsAndFundraisingView: FC<{ onProcess?: (updatedProject: Project) => void, onSkip: () => void }> = ({ onProcess, onSkip }) => {
    const { id } = useParams()
    const [project, setProject] = useAtom(projectAtom);
    const [projects] = useAtom(projectsAtom);
    const [, editProject] = useAtom(editProjectAtom);

    const [financialsAndFundraising, setFinancialsAndFundraising] = useState<string[]>(project?.pitchdeck?.financialsAndFundraising || ['', '', '']);

    const validate = (data: string[]) => {
        if (!data.length || data.find(item => !item.trim())) {
            throw new Error('You need to fill at least one revenue stream.');
        }
    };

    // Find and set the project based on the ID from the URL
    useEffect(() => {
        if (id) {
            setProject(structuredClone(projects.find(project => project.id === id) || null));
        }
    }, [id]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        try {
            validate(financialsAndFundraising);

            const updatedProject = {
                ...project,
                pitchdeck: {
                    ...project?.pitchdeck,
                    financialsAndFundraising: financialsAndFundraising,
                },
            };

            console.log('updatedProject', updatedProject);
            editProject(updatedProject);
            setProject(updatedProject);

            onProcess()
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <>
            <form className="px-24" onSubmit={handleSubmit}>
                <Title>Financials and fundraising</Title>

                <div className="flex justify-between mb-10 space-16">
                    <TextareaInput
                        className='w-[259px]'
                        title="Funding requirement"
                        titleType="fancy"
                        defaultValue={financialsAndFundraising[0]}
                        onChange={(value) => setFinancialsAndFundraising((prev) => [value, prev[1], prev[2]])}
                    />
                    <TextareaInput
                        className='w-[259px]'
                        title="Use of funds"
                        titleType="fancy"
                        defaultValue={financialsAndFundraising[1]}
                        onChange={(value) => setFinancialsAndFundraising((prev) => [prev[0], value, prev[2]])}
                    />
                    <TextareaInput
                        className='w-[259px]'
                        title="Milestones"
                        titleType="fancy"
                        defaultValue={financialsAndFundraising[2]}
                        onChange={(value) => setFinancialsAndFundraising((prev) => [prev[0], prev[1], value])}
                    />
                </div>

                <div className="flex space-x-10">
                    <Button
                        type="submit"
                        uppercase={true}
                        size="md"
                        className="px-20 rounded-xl"
                    >
                        Save
                    </Button>
                    <button
                        type="button"
                        className="border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-dark-primary rounded-xl px-8 py-3 font-[900] text-lg font-mono transition-all duration-1000"
                        onClick={() => alert('Invite mentor functionality')}
                    >
                        Invite mentor to validate
                    </button>
                    <SkipButton onClick={() => onSkip?.()} />
                </div>
            </form>
        </>
    );
};

export default FinancialsAndFundraisingView;
