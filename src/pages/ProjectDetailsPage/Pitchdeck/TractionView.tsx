import { Button } from 'components/UI';
import { useState, FormEvent, FC } from 'react';
import { useAtom } from 'jotai';
import { editProjectAtom, projectAtom } from 'storage/project/project.storage';
import PageHeader from 'components/ProjectDetails/PageHeader';
import TextareaInput from 'components/UI/TextareaInput';
import { Project } from 'types/project.types';
import SkipButton from 'components/Project/SkipButton';

const TractionView : FC<{ onProcess?: (updatedProject: Project) => void, onSkip: () => void }> = ({ onProcess, onSkip }) => {
    const [project, setProject] = useAtom(projectAtom);
    const [, editProject] = useAtom(editProjectAtom);

    const [traction, setTraction] = useState(project?.pitchdeck?.traction || {
        currentCustomers: '',
        expectedCustomers: '',
        currentRevenue: '',
        expectedRevenue: '',
    });

    const validate = (data: typeof traction) => {
        if (!data.currentCustomers || !data.expectedCustomers || !data.currentRevenue || !data.expectedRevenue) {
            throw new Error('All traction fields must be filled out.');
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        try {
            validate(traction);

            const updatedProject = {
                ...project,
                pitchdeck: {
                    ...project?.pitchdeck,
                    traction,
                },
            };

            console.log('updatedProject', updatedProject);
            editProject(updatedProject);
            setProject(updatedProject);

            onProcess?.();
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <form className="flex flex-col items-center px-24 text-white" onSubmit={handleSubmit}>
            <PageHeader
                title='Traction'
                subtitle="Traction is a metric used to assess a startup's advancement and momentum as it attracts customer interest, engages users, creates market demand, and generates revenue. It shows that the startup's offerings are appealing to its intended audience and gaining acceptance."
            />

            <div className='lg:w-[842px]'>
                <div className="grid grid-cols-2 gap-8 mb-10">
                    <TextareaInput
                        wrapperClassName='rounded-[20px] bg-grey-primary'
                        inputClassName="!text-2xl !h-24 placeholder:text-white"
                        placeholder="Enter the amount of customers you have right now"
                        value={traction.currentCustomers}
                        onChange={(value) => setTraction({ ...traction, currentCustomers: value })}
                    />
                    <TextareaInput
                        inputClassName="!text-2xl !h-24 placeholder:text-white"
                        placeholder="Enter the amount of customers you expect to have"
                        value={traction.expectedCustomers}
                        onChange={(value) => setTraction({ ...traction, expectedCustomers: value })}
                    />
                    <TextareaInput
                        wrapperClassName='rounded-[20px] bg-grey-primary'
                        inputClassName="!text-2xl !h-36 placeholder:text-white"
                        placeholder="Enter the revenue you have right now"
                        value={traction.currentRevenue}
                        onChange={(value) => setTraction({ ...traction, currentRevenue: value })}
                    />
                    <TextareaInput
                        inputClassName="!text-2xl !h-36 placeholder:text-white"
                        placeholder="Enter the revenue you expect to have"
                        value={traction.expectedRevenue}
                        onChange={(value) => setTraction({ ...traction, expectedRevenue: value })}
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
            </div>
        </form>
    );
};

export default TractionView;
