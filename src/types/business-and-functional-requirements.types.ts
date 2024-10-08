import { Project } from './project.types';

export interface BusinessAndFunctionalRequirements {
  id: string;
  businessRequirements: any;
  functionalRequirements: any;
  createdAt: Date;
  updatedAt: Date | null;
  projectId: Project['id'];
  project: Project;
}

export interface CreateBusinessAndFunctionalRequirements {
  businessRequirements: any;
  functionalRequirements: any;
  projectId: Project['id'];
}

export interface UpdateBusinessAndFunctionalRequirements {
  businessRequirements?: any;
  functionalRequirements?: any;
}
