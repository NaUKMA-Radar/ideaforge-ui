import { Button } from 'components/UI';
import TextareaInput from 'components/UI/TextareaInput';
import { FC, FormEvent, useEffect, useState } from 'react';
import PageHeader from 'components/ProjectDetails/PageHeader';
import { Link, useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { editProjectAtom, projectAtom, projectsAtom } from 'storage/project/project.storage';
import IncomeModal from './BusinessModelIncomeModal';
import SkipButton from 'components/Project/SkipButton';
import { Project } from 'types/project.types';

const BusinessModelPage: FC<{ onProcess?: (updatedProject: Project) => void, onSkip: () => void }> = ({ onProcess, onSkip }) => {
    const { id } = useParams()
    const [project, setProject] = useAtom(projectAtom);
    const [projects] = useAtom(projectsAtom);
    const [, editProject] = useAtom(editProjectAtom);

    const [revenueStreams, setRevenueStreams] = useState<string[]>(['', '', '']);
    const [income, setIncome] = useState<object>(project?.pitchdeck?.businessModel?.income || {});

    const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

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
            validate(revenueStreams);

            const updatedProject = {
                ...project,
                pitchdeck: {
                    ...project?.pitchdeck,
                    businessModel: {
                        ...project?.pitchdeck?.businessModel,
                        revenueStreams: JSON.stringify(revenueStreams),
                        income,
                    },
                },
            };

            console.log('updatedProject', updatedProject);
            editProject(updatedProject);
            setProject(updatedProject);

            onProcess(updatedProject);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <>
            {
                isIncomeModalVisible &&
                project &&
                <IncomeModal
                    project={project}
                    onClose={() => setIsIncomeModalVisible(false)}
                />
            }
            <form className="px-24" onSubmit={handleSubmit}>
                <PageHeader
                    title="Business model"
                    subtitle="Now it’s time to describe your business model. Enter the details about your revenue streams, then some details about your business’ expected income throughout the years."
                />

                <div className="flex justify-between mb-10 space-16">
                    <TextareaInput
                        className='max-w-[239px]'
                        title="Revenue stream 1"
                        titleType="fancy"
                        defaultValue={revenueStreams[0]}
                        onChange={(value) => setRevenueStreams((prev) => [value, prev[1], prev[2]])}
                    />
                    <TextareaInput
                        className='max-w-[239px]'
                        title="Revenue stream 2"
                        titleType="fancy"
                        defaultValue={revenueStreams[1]}
                        onChange={(value) => setRevenueStreams((prev) => [prev[0], value, prev[2]])}
                    />
                    <TextareaInput
                        className='max-w-[239px]'
                        title="Revenue stream 3"
                        titleType="fancy"
                        defaultValue={revenueStreams[2]}
                        onChange={(value) => setRevenueStreams((prev) => [prev[0], prev[1], value])}
                    />
                </div>

                <div className="flex items-center mb-16 space-x-10">
                    <button
                        type="button"
                        className='flex mr-8 space-x-4 rounded-2xl px-8 py-3 text-white bg-gradient-to-r from-[#FFFFFF00] to-[#4F16B480]'
                        onClick={() => setIsIncomeModalVisible(true)}
                    >
                        <span className='text-2xl'>Enter the income</span>
                    </button>
                    <Link to='/images/logo.png' target="_blank" download className='text-2xl text-white underline h-min'>
                        Download my graph
                    </Link>
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

export default BusinessModelPage;
