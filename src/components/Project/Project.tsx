import EditProjectModal from 'components/EditProjectModal/EditProjectModal';
import { EditIcon } from 'components/Icons/Icons';
import { FC, HTMLAttributes, useState } from 'react';
import { createPortal } from 'react-dom';
import { Project as ProjectType } from 'types/project.types';

export interface ProjectProps extends HTMLAttributes<HTMLDivElement> {
  view?: 'default' | 'square';
  project: ProjectType;
  index: number;
}

const Project: FC<ProjectProps> = ({ project, view = 'default', index, ...props }) => {
  const [isEditProjectModalVisible, setIsEditProjectModalVisible] = useState(false);

  const projectTitle = `Project ${index + 1}`;

  return (
    <>
      {isEditProjectModalVisible &&
        createPortal(
          <EditProjectModal
            project={project}
            title='Edit the project'
            onClose={() => setIsEditProjectModalVisible(false)}
            onProcess={() => setIsEditProjectModalVisible(false)}
          />,
          document.querySelector('body')!,
        )}
      {view === 'square' ? (
        <div
          className='flex flex-col items-center justify-center flex-1 w-full p-7 text-center text-white transition-all duration-300 cursor-pointer aspect-square bg-grey-primary rounded-[20px] hover:text-green-primary'
          {...props}
        >
          <h4 className='text-2xl font-[600] truncate'>{projectTitle}</h4>
          <h5 className='mt-2 text-lg truncate'>{project.name}</h5>
          <div className='mt-1.5'>
            {project.image ? (
              <img src={project.image} alt='Project image' />
            ) : (
              <img
                src='/images/empty_project_image.avif'
                alt='Project image'
                className='w-[80px] bg-white aspect-square rounded-xl object-cover'
              />
            )}
          </div>
        </div>
      ) : (
        <div
          className='flex items-center gap-5 p-5 text-white transition-all duration-300 cursor-pointer bg-grey-primary rounded-xl hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:text-green-primary'
          {...props}
        >
          <div>
            {project.image ? (
              <img src={project.image} alt='Project image' />
            ) : (
              <img
                src='/images/empty_project_image.avif'
                alt='Project image'
                className='w-[64px] bg-white aspect-square rounded-xl object-cover'
              />
            )}
          </div>
          <div className='flex flex-col flex-1'>
            <h4 className='text-2xl font-[600]'>{projectTitle}</h4>
            <h5 className='text-xl'>{project.name}</h5>
            <p className='text-lg'>{project.description}</p>
          </div>
          <div className='px-5'>
            <EditIcon
              className='text-white transition-all duration-300 size-8 hover:text-green-primary'
              onClick={event => {
                event.stopPropagation();
                setIsEditProjectModalVisible(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
