import { Button, TextInput, Title } from 'components/UI';
import TextareaInput from 'components/UI/TextareaInput';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { editProjectAtom, projectAtom, projectsAtom } from 'storage/project/project.storage';
import SkipButton from 'components/Project/SkipButton';
import { Project } from 'types/project.types';

interface Stage {
    duration: string,
    details: string,
}

const RoadmapView: FC<{ onProcess?: (updatedProject: Project) => void, onSkip: () => void }> = ({ onProcess, onSkip }) => {
    const { id } = useParams()
    const [project, setProject] = useAtom(projectAtom);
    const [projects] = useAtom(projectsAtom);
    const [, editProject] = useAtom(editProjectAtom);

    const [roadmap, setRoadmap] = useState<string[]>(project?.pitchdeck?.roadmap || {
        stage1: {} as Stage,
        stage2: {} as Stage,
        stage3: {} as Stage,
    });

    const validate = (data: string[]) => {
        for (const stage of Object.values(roadmap)) {
            if (!stage?.duration || !stage?.details) {
                throw new Error('All stages must have a duration and details.');
            }
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
            validate(roadmap);

            const updatedProject = {
                ...project,
                pitchdeck: {
                    ...project?.pitchdeck,
                    roadmap,
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
                <Title>Roadmap</Title>

                <div className="flex justify-between mb-10 space-16">
                    <div
                        className='w-[239px] space-y-2'
                    >
                        <p className='text-2xl text-white'>Stage 1</p>
                        <TextInput className='w-full !text-2xl' wrapperClass='!bg-grey-primary' placeholder='Enter duration' defaultValue={roadmap.stage1?.duration} 
                            onChange={(e) => setRoadmap((prev) => ({ ...prev, stage1: { ...prev?.stage1, duration: e.target.value } }))}
                        />
                        <TextareaInput
                            className='!text-2xl'
                            placeholder='Enter details'
                            titleType="fancy"
                            defaultValue={roadmap.stage1?.details}
                            onChange={(value) => setRoadmap((prev) => ({ ...prev, stage1: { ...prev?.stage1, details: value } }))}
                        />
                    </div>
                    <div
                        className='w-[239px] space-y-2'
                    >
                        <p className='text-2xl text-white'>Stage 2</p>
                        <TextInput className='w-full !text-2xl' wrapperClass='!bg-grey-primary' placeholder='Enter duration' defaultValue={roadmap.stage2?.duration} 
                            onChange={(e) => setRoadmap((prev) => ({ ...prev, stage2: { ...prev?.stage2, duration: e.target.value } }))}
                        />
                        <TextareaInput
                            className='!text-2xl'
                            placeholder='Enter details'
                            titleType="fancy"
                            defaultValue={roadmap.stage2?.details}
                            onChange={(value) => setRoadmap((prev) => ({ ...prev, stage2: { ...prev?.stage2, details: value } }))}
                        />
                    </div>
                    <div
                        className='w-[239px] space-y-2'
                    >
                        <p className='text-2xl text-white'>Stage 3</p>
                        <TextInput className='w-full !text-2xl' wrapperClass='!bg-grey-primary' placeholder='Enter duration' defaultValue={roadmap.stage3?.duration} 
                            onChange={(e) => setRoadmap((prev) => ({ ...prev, stage3: { ...prev?.stage3, duration: e.target.value } }))}
                        />
                        <TextareaInput
                            className='!text-2xl'
                            placeholder='Enter details'
                            titleType="fancy"
                            defaultValue={roadmap.stage3?.details}
                            onChange={(value) => setRoadmap((prev) => ({ ...prev, stage3: { ...prev?.stage3, details: value } }))}
                        />
                    </div>
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

export default RoadmapView;
