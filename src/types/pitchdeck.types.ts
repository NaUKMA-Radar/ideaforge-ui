import { Project } from './project.types';

export interface Pitchdeck {
  id: string;
  problems: any;
  solutions: any;
  product: any;
  ideaValidation: any;
  competitors: any;
  businessModel: any;
  goToMarketStrategy: any;
  userAcquisitonStrategy: any;
  financialsAndFundraising: any;
  roadmap: any;
  traction: any;
  team: any;
  createdAt: Date;
  updatedAt: Date | null;
  projectId: Project['id'];
  project: Project;
}

export interface CreatePitchdeck {
  problems: any;
  solutions: any;
  product: any;
  ideaValidation: any;
  competitors: any;
  businessModel: any;
  goToMarketStrategy: any;
  userAcquisitonStrategy: any;
  financialsAndFundraising: any;
  roadmap: any;
  traction: any;
  team: any;
  projectId: Project['id'];
}

export interface UpdatePitchdeck {
  problems?: any;
  solutions?: any;
  product?: any;
  ideaValidation?: any;
  competitors?: any;
  businessModel?: any;
  goToMarketStrategy?: any;
  userAcquisitonStrategy?: any;
  financialsAndFundraising?: any;
  roadmap?: any;
  traction?: any;
  team?: any;
}
