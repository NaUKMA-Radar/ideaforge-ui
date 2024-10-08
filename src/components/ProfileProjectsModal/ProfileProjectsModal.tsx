import Modal, { ModalProps } from 'components/Modal/Modal';
import Project from 'components/Project/Project';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { profilePageProjectsAtom } from 'storage/project/project.storage';
import { ApplicationRoutes } from 'utils/app.utils';

export interface ProfileProjectsModalProps extends ModalProps {}

const ProfileProjectsModal: FC<ProfileProjectsModalProps> = ({ ...props }) => {
  const [projects] = useAtom(profilePageProjectsAtom);
  const navigate = useNavigate();

  return (
    <Modal className='max-w-[600px] w-full' {...props}>
      <div className='grid grid-cols-2 gap-10'>
        {projects.map((project, index) => (
          <Project
            key={project.id}
            onClick={() => navigate(ApplicationRoutes.ProjectDetails.replace(':id', 'projectId'))}
            view='square'
            project={project}
            index={index}
          />
        ))}
      </div>
    </Modal>
  );
};

export default ProfileProjectsModal;
