import { Button } from 'components/UI';
import TextareaInput from 'components/UI/TextareaInput';
import { useAtom } from 'jotai';
import { FC, FormEvent } from 'react';
import { editProjectAtom } from 'storage/project/project.storage';
import { Project } from 'types/project.types';
import { v4 as uuid } from 'uuid';
import { ModalProps } from 'components/Modal/Modal';
import PageHeader from 'components/ProjectDetails/PageHeader';
import SkipButton from 'components/Project/SkipButton';

interface ProductViewProps extends ModalProps {
    project: Project;
    onSkip: () => void;
}

const ProductView: FC<ProductViewProps> = ({ onProcess, onSkip, project }) => {
    const [, editProject] = useAtom(editProjectAtom);

    const advantages = [
        // 'Advantage 1 description',
        // 'Advantage 2 description',
        // 'Advantage 3 description',
        // 'Advantage 4 description',
    ]
    const keyFeatures = [
        // 'Key feature 1 description',
        // 'Key feature 2 description',
        // 'Key feature 3 description',
        // 'Key feature 4 description',
    ]

    const validate = (data: string[]) => {
        if (!data.length || data.find(item => !item.trim())) {
            throw new Error('You need to fill at least one advantage and key feature');
        }
    };
    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    
        try {
            validate(advantages);
            validate(keyFeatures);
        
            const updatedProject = {
                ...project,
                pitchdeck: {
                    ...project?.pitchdeck,
                    product: {
                        ...(project?.product || ({ id: uuid() } as any)),
                        advantages: JSON.stringify(advantages),
                        keyFeatures: JSON.stringify(keyFeatures),
                    },
                }
            };

            console.log('updatedProject', updatedProject)
        
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
                title='Product'
                subtitle='Please describe your product as deeply as you can. Mention its advantages and describe them, write about the key features.'
            />

            <div className='grid grid-cols-4 gap-8 mb-8'>
                <TextareaInput title='Advantage 1' titleType='fancy' defaultValue={advantages[0]} onChange={(value) => advantages[0] = value} />
                <TextareaInput title='Advantage 2' titleType='fancy' defaultValue={advantages[1]} onChange={(value) => advantages[1] = value} />
                <TextareaInput title='Advantage 3' titleType='fancy' defaultValue={advantages[2]} onChange={(value) => advantages[2] = value} />
                <TextareaInput title='Advantage 4' titleType='fancy' defaultValue={advantages[3]} onChange={(value) => advantages[3] = value} />

                <TextareaInput title='Key feature 1' titleType='fancy' defaultValue={keyFeatures[0]} onChange={(value) => keyFeatures[0] = value} />
                <TextareaInput title='Key feature 2' titleType='fancy' defaultValue={keyFeatures[1]} onChange={(value) => keyFeatures[1] = value} />
                <TextareaInput title='Key feature 3' titleType='fancy' defaultValue={keyFeatures[2]} onChange={(value) => keyFeatures[2] = value} />
                <TextareaInput title='Key feature 4' titleType='fancy' defaultValue={keyFeatures[3]} onChange={(value) => keyFeatures[3] = value} />
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

export default ProductView;
