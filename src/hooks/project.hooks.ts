import { useAtom } from 'jotai';
import {
  // fetchTeamProjectsAtom,
  // createAtom,
  // fetchOneAtom,
  // updateAtom,
  selectedProjectAtom,
  projectsAtom,
  // removeAtom,
} from '../storage/project/project.storage';

export const useProjectStorage = () => {
  // const [projects, fetchTeamProjects] = useAtom(fetchTeamProjectsAtom);
  // const [selectedProject, fetchProjectById] = useAtom(fetchOneAtom);
  // const [_createProject, createProject] = useAtom(createAtom);
  // const [_updateProject, updateProject] = useAtom(updateAtom);
  // const [_removeProject, removeProject] = useAtom(removeAtom);
  const [_selectedProject, setSelectedProjectInStorage] = useAtom(selectedProjectAtom);
  const [_projects, setProjectsInStorage] = useAtom(projectsAtom);

  return {
    // projects,
    // selectedProject,
    // fetchTeamProjects,
    // fetchProjectById,
    // createProject,
    // updateProject,
    // removeProject,
    // setSelectedProjectInStorage,
    setProjectsInStorage,
  };
};
