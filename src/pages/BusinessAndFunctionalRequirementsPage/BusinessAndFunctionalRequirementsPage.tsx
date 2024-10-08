import { useEffect, useState } from 'react';
import { Button, Title } from 'components/UI';
import { Link, useParams } from 'react-router-dom';
import Navbar from 'components/Navbar/Navbar';
import { navbarLinks } from 'utils/app.utils';
import { useAtom } from 'jotai';
import { projectAtom, projectsAtom } from 'storage/project/project.storage';
import InviteMentorButton from 'components/Project/InviteMentorButton';

const BusinessAndFunctionalRequirementsPage = () => {
    const { id } = useParams();
    const [project, setProject] = useAtom(projectAtom);
    const [projects] = useAtom(projectsAtom);
    const [businessRequirementsText] = useState<string>(project?.businessAndFunctionalRequirements?.businessRequirements || 'Your business requirements text will be displayed here.');
    const [functionalRequirementsText] = useState<string>(project?.businessAndFunctionalRequirements?.functionalRequirements || 'Your functional requirements text will be displayed here.');

    useEffect(() => {
        if (id) {
            setProject(structuredClone(projects.find(project => project.id === id) || null));
        }
    }, [id]);

    const renderScrollableText = (title: string, text: string) => (
        <div className="flex flex-col items-center justify-between p-4 mb-4 w-full h-[400px] border-gradient-primary rounded-[20px] before:rounded-[20px]">
            <h3 className="text-2xl text-white">{title}</h3>
            <div className="w-full mt-4 overflow-y-auto text-left h-[300px] p-4 bg-dark-primary rounded-xl text-white">
                {text}
            </div>
            <Link to="/images/logo.png" target="_blank" download className="text-2xl text-white underline">
                Download your document
            </Link>
        </div>
    );

    return (
        <>
            <Navbar links={navbarLinks} className='sticky top-0 z-50 flex justify-center w-full' />
            <div className="px-24 py-10 text-white">
            <Title>Business and functional requirements</Title>

            <div className="flex space-x-16">
                {renderScrollableText('Business requirements', businessRequirementsText)}
                {renderScrollableText('Functional requirements', functionalRequirementsText)}
            </div>

            <div className="flex mt-8 space-x-10">
                <Button
                    type="button"
                    uppercase={true}
                    size="md"
                    className="px-20 rounded-2xl"
                >
                    save
                </Button>

                {
                    project &&
                    <InviteMentorButton inviteToId={project.id} />
                }

            </div>
            </div>
        </>
    );
};

export default BusinessAndFunctionalRequirementsPage;
