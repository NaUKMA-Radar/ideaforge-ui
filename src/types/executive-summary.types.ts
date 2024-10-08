import { Project } from './project.types';

export interface ExecutiveSummary {
  id: string;
  summary: string;
  files: any;
  createdAt: Date;
  updatedAt: Date | null;
  projectId: Project['id'];
  project: Project;
}

export interface CreateExecutiveSummary {
  summary: string;
  files?: any;
  projectId: Project['id'];
}

export interface UpdateExecutiveSummary {
  summary?: string;
  files?: any;
}
