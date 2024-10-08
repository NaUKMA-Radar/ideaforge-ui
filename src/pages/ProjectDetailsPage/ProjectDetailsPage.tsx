import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApplicationRoutes, navbarLinks } from 'utils/app.utils';
import { useAtom } from 'jotai';
import { projectAtom, projectsAtom } from 'storage/project/project.storage';
import { Title } from 'components/UI';
import { UserToProject } from 'types/user-to-project.types';
import Navbar from 'components/Navbar/Navbar';

const ProjectDetailsPage: FC = () => {
  const { id } = useParams();
  const [projects] = useAtom(projectsAtom);
  const [project, setProject] = useAtom(projectAtom);

    useEffect(() => {
      if (id) {
        setProject(structuredClone(projects.find(project => project.id === id) || null));
      }
    }, [id]);
  
  if (!project || project.id !== id) {
    return <p className='text-white'>Project not found</p>;
  }

  return (
    <>
      <Navbar links={navbarLinks} className='sticky top-0 z-50 flex justify-center w-full' />
      <div className="px-24 py-10 space-y-12 text-white">
        <Title className='!text-left my-0'>{project.name}</Title>

        <div className="space-y-5">
          <h3 className="text-2xl font-semibold">Project description</h3>
          <p className="mt-2 text-lg">{project.description}</p>
        </div>

        <div className="space-y-5">
          <h3 className="text-2xl font-semibold">Project owner</h3>
          <p className="mt-2 text-lg">
            {project.userToProjects.find((user: UserToProject) => user?.role === 'Owner')?.user?.lastName || project.userToProjects.find((user: UserToProject) => user?.role === 'Owner')?.userId}
          </p>
        </div>

        <div className="space-y-5">
          <h3 className="text-2xl font-semibold">Project members</h3>
          <p className="mt-2 text-lg">
            {project.userToProjects.map((member: UserToProject, i: number) => (
                <span key={i}>
                    {member?.user?.lastName || member?.userId}
                    {i < project.userToProjects.length - 1 && ", "}
                </span>
            ))}
          </p>
        </div>

        <div className="flex flex-col space-y-10">
          <Link
            to={`${ApplicationRoutes.Projects}/${project.id}${ApplicationRoutes.CreateYourPitchDeck}`}
            className="text-2xl text-green-primary hover:underline"
          >
            See pitch deck
          </Link>
          <Link
            to={`${ApplicationRoutes.Projects}/${project.id}${ApplicationRoutes.ExecutiveSummary}`}
            className="text-2xl text-green-primary hover:underline"
          >
            See executive summary
          </Link>
          <Link
            to={`${ApplicationRoutes.Projects}/${project.id}${ApplicationRoutes.DataroomAndMetrics}`}
            className="text-2xl text-green-primary hover:underline"
          >
            Data room
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
