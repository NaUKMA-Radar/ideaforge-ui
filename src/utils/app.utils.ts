import { NavbarLink } from 'components/Navbar/Navbar';

export enum ApplicationRoutes {
  Any = '*',
  DocumentDetails = '/documents/:id',
  Root = '/',
  Home = '/home',
  Projects = '/projects',
  Events = '/events',
  Hackathons = '/hackathons',
  SignUp = '/sign-up',
  SignIn = '/sign-in',
  Profile = '/profile',
  ProjectDetails = '/projects/:id',
  // project stages
  Start = '/start',
  CreateYourPitchDeck = '/create-your-pitch-deck',
  ExecutiveSummary = '/executive-summary',
  DataroomAndMetrics = '/dataroom-and-metrics',
  BusinessAndFunctionalRequirements = '/business-and-functional-requirements',
  Kanban = '/kanban',
  IdeaValidation = '/idea-validation',
}

export const navbarLinks: NavbarLink[] = [
  { name: 'Projects', to: ApplicationRoutes.Projects },
  { name: 'Events', to: ApplicationRoutes.Events },
  { name: 'Hackathons', to: ApplicationRoutes.Hackathons },
];

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
