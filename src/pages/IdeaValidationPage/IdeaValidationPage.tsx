import { FC, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { editProjectAtom, projectAtom, projectsAtom } from 'storage/project/project.storage';
import toastNotifications from 'utils/toastNotifications.utils';
import PageHeader from 'components/ProjectDetails/PageHeader';
import { Button } from 'components/UI';
import InviteMentorButton from 'components/Project/InviteMentorButton';
import TextareaInput from 'components/UI/TextareaInput';

const IdeaValidationPage: FC = () => {
    const { id } = useParams();
    const [project, setProject] = useAtom(projectAtom);
    const [projects] = useAtom(projectsAtom);
    const [, editProject] = useAtom(editProjectAtom);
    const [formData, setFormData] = useState({
        problemStatement: '',
        targetAudience: '',
        uniqueValueProposition: '',
    });

    useEffect(() => {
        if (id) {
            const foundProject = projects.find(project => project.id === id);
            setProject(structuredClone(foundProject || null));
            
            if (foundProject && foundProject.ideaValidation) {
                setFormData({
                    problemStatement: foundProject.ideaValidation.problemStatement || '',
                    targetAudience: foundProject.ideaValidation.targetAudience || '',
                    uniqueValueProposition: foundProject.ideaValidation.uniqueValueProposition || '',
                });
            }
        }
    }, [id]);

    const handleInputChange = (name: string) => (value: string) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Here you would typically save the form data to your backend
        console.log('Form data:', formData);
        toastNotifications.success("Idea validation data saved successfully!");

        const updatedProject = {
            ...project,
            ideaValidation: {
                problemStatement: formData.problemStatement,
                targetAudience: formData.targetAudience,
                uniqueValueProposition: formData.uniqueValueProposition,
            }
        };

        editProject(updatedProject);
        setProject(updatedProject);
    };

    return (
        <form className="px-24" onSubmit={(e) => e.preventDefault()}>
            <PageHeader
                title="Idea Validation"
                subtitle="Validate your project idea by answering these key questions. This process helps ensure your concept addresses a real need and has potential for success."
            />

            <div className="space-y-6">
                <TextareaInput
                    id="problemStatement"
                    title="What problem does your project solve?"
                    defaultValue={formData.problemStatement}
                    onChange={handleInputChange('problemStatement')}
                    wrapperClassName="bg-grey-primary"
                />

                <TextareaInput
                    id="targetAudience"
                    title="Who is your target audience?"
                    defaultValue={formData.targetAudience}
                    onChange={handleInputChange('targetAudience')}
                    wrapperClassName="bg-grey-primary"
                />

                <TextareaInput
                    id="uniqueValueProposition"
                    title="What is your unique value proposition?"
                    defaultValue={formData.uniqueValueProposition}
                    onChange={handleInputChange('uniqueValueProposition')}
                    wrapperClassName="bg-grey-primary"
                />
            </div>

            <div className="flex mt-8 space-x-8">
                <Button
                    type="button"
                    uppercase={true}
                    size="md"
                    className="px-20 rounded-2xl"
                    onClick={handleSave}
                >
                    save
                </Button>

                {project && <InviteMentorButton inviteToId={project.id} />}
            </div>
        </form>
    );
};

export default IdeaValidationPage;
