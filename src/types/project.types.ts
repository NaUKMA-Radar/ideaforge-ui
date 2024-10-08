import { BusinessAndFunctionalRequirements } from './business-and-functional-requirements.types';
import { DataroomAndMetrics } from './dataroom-and-metrics.types';
import { ExecutiveSummary } from './executive-summary.types';
import { Pitchdeck } from './pitchdeck.types';
import { Task } from './task.types';
import { UserToProject } from './user-to-project.types';
import { User } from './user.types';

export interface Project {
  id: string;
  name: string;
  url: string;
  socialMediaLinks: any;
  description: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  authorId: User['id'];
  pitchdeckId: Pitchdeck['id'] | null;
  executiveSummaryId: ExecutiveSummary['id'] | null;
  dataroomAndMetricsId: DataroomAndMetrics['id'] | null;
  businessAndFunctionalRequirementsId: BusinessAndFunctionalRequirements['id'] | null;
  author: User;
  userToProjects: UserToProject[];
  tasks: Task[];
  pitchdeck: Pitchdeck | null;
  executiveSummary: ExecutiveSummary | null;
  dataroomAndMetrics: DataroomAndMetrics | null;
  businessAndFunctionalRequirements: BusinessAndFunctionalRequirements | null;
}

export type CreateProjectMemberDto = Omit<
  UserToProject,
  'projectId' | 'invitedAt' | 'user' | 'project' | 'userId'
> &
  Pick<User, 'email'>;

export type UpdateProjectMemberDto = Partial<
  Omit<UserToProject, 'projectId' | 'invitedAt' | 'user' | 'project' | 'userId'>
> &
  Pick<User, 'email'>;

export type RemoveProjectMemberDto = Pick<User, 'email'>;

export interface CreateProjectDto {
  name: string;
  url: string;
  socialMediaLinks: any;
  description: string;
  image?: string | null;
  authorId: User['id'];
  membersToAdd?: CreateProjectMemberDto[];
}

export interface UpdateProjectDto {
  name?: string;
  url?: string;
  socialMediaLinks?: any;
  description?: string;
  image?: string | null;
  membersToAdd?: CreateProjectMemberDto[];
  membersToUpdate?: UpdateProjectMemberDto[];
  membersToRemove?: RemoveProjectMemberDto[];
}
