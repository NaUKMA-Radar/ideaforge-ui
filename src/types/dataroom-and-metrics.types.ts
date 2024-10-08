import { Project } from './project.types';

export interface DataroomAndMetrics {
  id: string;
  financialDocuments: any;
  taxDocuments: any;
  legalDocuments: any;
  createdAt: Date;
  updatedAt: Date | null;
  projectId: Project['id'];
  project: Project;
}

export interface CreateDataroomAndMetrics {
  financialDocuments: any;
  taxDocuments: any;
  legalDocuments: any;
  projectId: Project['id'];
}

export interface UpdateDataroomAndMetrics {
  financialDocuments?: any;
  taxDocuments?: any;
  legalDocuments?: any;
}
