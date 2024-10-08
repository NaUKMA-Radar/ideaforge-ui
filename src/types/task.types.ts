import { TaskTypeEnum } from './enums/task-type.enum';
import { Project } from './project.types';
import { User } from './user.types';

export interface Task {
  id: string;
  description: string;
  files: any;
  deadline: Date | null;
  type: TaskTypeEnum;
  createdAt: Date;
  updatedAt: Date | null;
  authorId: User['id'];
  projectId: Project['id'];
  assignedToId: User['id'] | null;
  author: User;
  project: Project;
  assignedTo: User;
}

export interface CreateTask {
  description: string;
  files?: any;
  deadline?: Date | null;
  type: TaskTypeEnum;
  authorId: User['id'];
  projectId: Project['id'];
  assignedToId?: User['id'] | null;
}

export interface UpdateTask {
  description?: string;
  files?: any;
  deadline?: Date | null;
  type?: TaskTypeEnum;
  assignedToId?: User['id'] | null;
}
