import { Button } from 'components/UI';
import TextareaInput from 'components/UI/TextareaInput';
import { useAtom } from 'jotai';
import { FC, FormEvent, useState } from 'react';
import { editProjectAtom } from 'storage/project/project.storage';
import { Project } from 'types/project.types';
import { ModalProps } from 'components/Modal/Modal';
import PageHeader from 'components/ProjectDetails/PageHeader';
import SkipButton from 'components/Project/SkipButton';

interface ProductViewProps extends ModalProps {
    project: Project;
    onSkip: () => void;
}

const IdeaValidationView: FC<ProductViewProps> = ({ onProcess, onSkip, project }) => {
    const [, editProject] = useAtom(editProjectAtom);

    const [textareaValue, setTextareaValue] = useState(project?.pitchdeck?.ideaValidation || '')

    const validate = (data: string[]) => {
        if (!data.length) {
            throw new Error('The text area must not be empty');
        }
    };
    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    
        try {
            validate(textareaValue);

            const updatedProject = {
                ...project,
                pitchdeck: {
                    ...project?.pitchdeck,
                    ideaValidation: textareaValue,
                }
            };

            console.log('updatedProject idea v.', updatedProject)
        
            editProject(updatedProject);

            onProcess?.(updatedProject);
        } catch (error: any) {
            // setState({ ...state, error: error.message });
            console.log(error)
        }
    };
    

    return (
        <form className='px-24' onSubmit={handleSubmit}>
            <PageHeader
                title='Idea validation'
                subtitle='Before starting an active phase of development, you need to validate your idea. Show it to your potential users and ask them to express their opinion about it. We prepared some common questions for you to conduct a survey.'
            />

            <div className='mb-8'>
                <TextareaInput defaultValue={textareaValue} onChange={v => setTextareaValue(v)} />
            </div>

            <div className='flex space-x-10'>
                <Button
                    type='submit'
                    uppercase={true}
                    size='md'
                    className='px-20 rounded-xl'
                >
                    save
                </Button>
                <button
                    type='button'
                    className='border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-dark-primary rounded-xl px-8 py-3 font-[900] text-lg font-mono transition-all duration-1000'
                >
                    Invite mentor to validate
                </button>
                <SkipButton onClick={() => onSkip?.()} />
            </div>
        </form>
    );
};

export default IdeaValidationView;
