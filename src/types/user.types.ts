import { Task } from './task.types';
import { UserToProject } from './user-to-project.types';

export interface User {
  id: string;
  email: string;
  password: string | null;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  userToProjects: UserToProject[];
  createdTasks: Task[];
  assignedTasks: Task[];
}

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  email?: string | null;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  image?: string | null;
}
