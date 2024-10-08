import CreateProjectModal from 'components/CreateProjectModal/CreateProjectModal';
import Footer from 'components/Footer/Footer';
import { PlusIcon } from 'components/Icons/Icons';
import Navbar from 'components/Navbar/Navbar';
import ProfileProjectsModal from 'components/ProfileProjectsModal/ProfileProjectsModal';
import Project from 'components/Project/Project';
import { Title } from 'components/UI';
import { useAtom } from 'jotai';
import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { profilePageProjectsAtom } from 'storage/project/project.storage';
import { ApplicationRoutes, navbarLinks } from 'utils/app.utils';

export enum ProfilePageData {
  MyProjects = 'my-projects',
  MyEvents = 'my-events',
  Following = 'following',
}

const ProfilePage: FC = () => {
  const [, getProfilePageProjects] = useAtom(profilePageProjectsAtom);
  const projects = getProfilePageProjects('<authenticated_user_id_must_be_here>');
  const [visibleData, setVisibleData] = useState<ProfilePageData>(ProfilePageData.MyProjects);
  const [isCreateNewProjectModalVisible, setIsCreateNewProjectModalVisible] = useState(false);
  const [isProfileProjectsModalVisible, setIsProfileProjectsModalVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {isCreateNewProjectModalVisible &&
        createPortal(
          <CreateProjectModal
            title='New project'
            onProcess={() => setIsCreateNewProjectModalVisible(false)}
            onClose={() => setIsCreateNewProjectModalVisible(false)}
          />,
          document.querySelector('body')!,
        )}
      {isProfileProjectsModalVisible &&
        createPortal(
          <ProfileProjectsModal
            onProcess={() => setIsProfileProjectsModalVisible(false)}
            onClose={() => setIsProfileProjectsModalVisible(false)}
          />,
          document.querySelector('body')!,
        )}
      <main className='flex flex-col min-h-screen bg-white dark:bg-dark-primary'>
        <Navbar links={navbarLinks} className='sticky top-0 z-50 flex justify-center w-full' />
        <div className='flex flex-col flex-1 max-w-[1440px] self-center w-full'>
          <Title className='text-green-primary my-14'>
            My account
          </Title>
          <div className='flex items-center gap-10'>
            <div className='aspect-square'>
              <img
                src='/images/empty_profile_image.webp'
                alt='Profile image'
                className='w-[128px] aspect-square rounded-full object-cover'
              />
            </div>
            <div className='flex flex-col flex-1 gap-1'>
              <p className='text-white text-3xl font-[700]'>Name Surname</p>
              <p className='text-white text-xl font-[400]'>example@gmail.com</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 max-w-[1440px] self-center w-full gap-20 mt-20'>
          <div
            className='flex flex-col items-center p-10 text-white transition-all duration-300 cursor-pointer bg-gradient-white-purple rounded-xl hover:scale-105'
            onClick={() => setIsCreateNewProjectModalVisible(true)}
          >
            <h4 className='flex items-center gap-2 text-center'>
              <PlusIcon className='size-8' />
              <span className='text-2xl'>Create new project</span>
            </h4>
            <p className='mt-5 text-xl'>Start your journey to the world of start-ups </p>
          </div>
          <div
            className='text-white flex flex-col bg-[linear-gradient(270deg,_rgba(255,_255,_255,_0)_0%,_rgba(79,_22,_180,_0.5)_100%)] p-10 rounded-xl items-center cursor-pointer hover:scale-105 transition-all duration-300'
            onClick={() => setIsProfileProjectsModalVisible(true)}
          >
            <h4 className='flex items-center gap-2 text-center'>
              <span className='text-2xl text-center'>Go to existing projects</span>
            </h4>
            <p className='mt-5 text-xl'>Choose the project to work with</p>
          </div>
        </div>
        <div className='flex flex-col max-w-[1440px] self-center w-full mt-20'>
          <div className='flex gap-10 font-[600]'>
            <span
              className={`text-xl text-green-primary cursor-pointer border-b-2 hover:border-green-primary transition-all duration-300 ${visibleData === ProfilePageData.MyProjects ? 'border-green-primary' : 'border-transparent'}`}
              onClick={() => setVisibleData(ProfilePageData.MyProjects)}
            >
              My projects
            </span>
            <span
              className={`text-xl text-green-primary cursor-pointer border-b-2 hover:border-green-primary transition-all duration-300 ${visibleData === ProfilePageData.MyEvents ? 'border-green-primary' : 'border-transparent'}`}
              onClick={() => setVisibleData(ProfilePageData.MyEvents)}
            >
              My events
            </span>
            <span
              className={`text-xl text-green-primary cursor-pointer border-b-2 hover:border-green-primary transition-all duration-300 ${visibleData === ProfilePageData.Following ? 'border-green-primary' : 'border-transparent'}`}
              onClick={() => setVisibleData(ProfilePageData.Following)}
            >
              Following
            </span>
          </div>
          {visibleData === ProfilePageData.MyProjects &&
            (!projects.length ? (
              <div className='mt-10 text-white font-[600] text-lg'>
                You don't have any projects yet
              </div>
            ) : (
              <div className='grid grid-cols-2 gap-5 mt-10'>
                {projects.map(project => (
                  <Project
                    key={project.id}
                    onClick={() =>
                      navigate(ApplicationRoutes.ProjectDetails.replace(':id', 'projectId'))
                    }
                    project={project}
                  />
                ))}
              </div>
            ))}
        </div>
        <Footer className='inline-flex relative h-[20px] w-full mt-[100px] p-10 justify-around bg-dark-secondary' />
      </main>
    </>
  );
};

export default ProfilePage;
