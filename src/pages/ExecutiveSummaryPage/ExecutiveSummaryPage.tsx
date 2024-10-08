import { FC, useEffect } from 'react';
import toastNotifications from 'utils/toastNotifications.utils';
import PageHeader from 'components/ProjectDetails/PageHeader';
import { Button } from 'components/UI';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { projectAtom, projectsAtom } from 'storage/project/project.storage';
import InviteMentorButton from 'components/Project/InviteMentorButton';

const ExecutiveSummaryPage: FC = () => {
    const { id } = useParams();
    const [project, setProject] = useAtom(projectAtom);
    const [projects] = useAtom(projectsAtom);

    useEffect(() => {
        if (id) {
            setProject(structuredClone(projects.find(project => project.id === id) || null));
        }
    }, [id]);

    const handleCreateExecutveSummary = () => {
        // alert('Create my executive summary');
        toastNotifications.success("Your summary has just been created! If it wasn’t downloaded automatically, please click the “Download my summary” button ");
    };

    const handleSave = () => {
        toastNotifications.info("Save executive summary.");
    };

    return (
        <>
            <form className="px-24" onSubmit={(e) => e.preventDefault()}>
                <PageHeader
                    title="Creating your executive summary"
                    subtitle="An executive summary is a brief overview of the key details in your project plan. It highlights the essential information that your management team should be aware of as soon as they review your project, even before they delve into the project plan itself."
                />

                <div className="flex mb-4 space-x-8">
                    <button
                        type="button"
                        className="flex items-center px-4 py-3 mr-8 space-x-4 text-white rounded-2xl bg-gradient-white-purple"
                        onClick={handleCreateExecutveSummary}
                    >
                        Create my executive summary
                    </button>
                    <Button
                        type="button"
                        uppercase={true}
                        size="md"
                        className="px-20 rounded-2xl"
                        onClick={handleSave} // Save project with executive summary
                    >
                        save
                    </Button>

                    {
                        project &&
                        <InviteMentorButton inviteToId={project.id} />
                    }
                </div>

                <div className="mt-8">
                    <Link to="/images/logo.png" target="_blank" download className="text-2xl text-white underline">
                        Download my summary
                    </Link>
                </div>
            </form>
        </>
    );
};

export default ExecutiveSummaryPage;
