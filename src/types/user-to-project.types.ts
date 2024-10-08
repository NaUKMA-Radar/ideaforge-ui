import { UserToProjectRoleEnum } from './enums/user-to-project-role.enum';
import { Project } from './project.types';
import { User } from './user.types';

export interface UserToProject {
  projectId: Project['id'];
  userId: User['id'];
  role: UserToProjectRoleEnum;
  isMentor: boolean;
  invitedAt: Date;
  user: User;
  project: Project;
}
