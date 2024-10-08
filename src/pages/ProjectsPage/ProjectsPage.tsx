import { FC } from 'react';
import { useAtom } from 'jotai';
import { Title } from 'components/UI';
import { profilePageProjectsAtom } from 'storage/project/project.storage';
import Avatar from 'components/UI/Avatar';
import { UserToProject } from 'types/user-to-project.types';
import { Link } from 'react-router-dom';
import { ApplicationRoutes, navbarLinks } from 'utils/app.utils';
import Navbar from 'components/Navbar/Navbar';

const ProjectsPage: FC = () => {
    const [projects] = useAtom(profilePageProjectsAtom);

    return (
        <>
            <Navbar links={navbarLinks} className='sticky top-0 z-50 flex justify-center w-full' />
            <div className="px-24 py-10">
                <Title>Projects</Title>
                <div className="mt-8 space-y-6">
                    {projects && projects?.map((project, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-12 p-6 space-x-8 text-white shadow-lg rounded-2xl bg-gradient-white-purple"
                        >
                            <div className='col-span-2'>
                                <Avatar />
                            </div>
                            <div className='flex flex-col justify-center col-span-4 space-y-4'>
                                <Link
                                    to={`${ApplicationRoutes.Projects}/${project?.id}`}
                                    className="font-mono text-2xl font-semibold hover:underline"
                                >
                                    {project.name}
                                </Link>
                                <p className="text-2xl truncate">{project.description}</p>
                            </div>
                            <div className="flex flex-col justify-center col-span-6 space-y-4">
                                <p className="text-2xl text-white truncate">
                                    Project owner: <span className="font-semibold">{project.userToProjects.find((user: UserToProject) => user?.role === 'Owner')?.user?.lastName || project.userToProjects.find((user: UserToProject) => user?.role === 'Owner')?.userId}</span>
                                </p>
                                <p className="text-2xl text-right truncate">
                                    Project members:{" "}
                                    {project.userToProjects.map((member: UserToProject, i: number) => (
                                        <span key={i}>
                                            {member?.user?.lastName || member?.userId}
                                            {i < project.userToProjects.length - 1 && ", "}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProjectsPage;
