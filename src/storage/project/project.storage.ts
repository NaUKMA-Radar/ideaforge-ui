import { atom } from 'jotai';
import { Project } from 'types/project.types';
import { User } from 'types/user.types';

export const projectAtom = atom<Project | null>(null);
export const projectsAtom = atom<Project[]>([
  {
    id: "1",
    name: "Test Project",
    url: "https://testproject.com",
    socialMediaLinks: {
      twitter: "https://twitter.com/testproject",
      linkedin: "https://linkedin.com/testproject"
    },
    description: "This is a test project for demonstration purposes.",
    image: null, // Assuming no image for this example
    createdAt: new Date(), // Current Date
    updatedAt: null, // No updates yet
  
    // Author info
    authorId: "123e4567-e89b-12d3-a456-426614174001", // Author's UUID
    author: {
      id: "123e4567-e89b-12d3-a456-426614174001",
      name: "John Doe",
      email: "johndoe@example.com",
      // Add other user properties as necessary
    },
  
    // Relationships to other entities
    pitchdeckId: "123e4567-e89b-12d3-a456-426614174002", // UUID of Pitchdeck
    pitchdeck: JSON.stringify({
      id: "123e4567-e89b-12d3-a456-426614174002",
      problems: { description: "Problem 1", impact: "High" },
      solutions: { description: "Solution 1", approach: "Innovative" },
      product: { name: "Product A", features: ["Feature 1", "Feature 2"] },
      ideaValidation: { method: "Surveys", result: "Positive" },
      competitors: [{ name: "Competitor 1" }, { name: "Competitor 2" }],
      businessModel: { type: "Subscription", pricing: "Monthly" },
      goToMarketStrategy: { strategy: "Online Marketing", channels: ["SEO", "PPC"] },
      userAcquisitionStrategy: { strategy: "Content Marketing", channels: ["Blog", "Social Media"] },
      financialsAndFundraising: { target: "$1M", status: "In Progress" },
      roadmap: { phase1: "Research", phase2: "Development", phase3: "Launch" },
      traction: { users: 500, growthRate: "10% monthly" },
      team: [{ name: "Jane Doe", role: "CTO" }, { name: "Alice Smith", role: "COO" }],
      createdAt: new Date(),
      updatedAt: null,
    }),
    problems: JSON.stringify(['problem 1 descriptoin', 'problem 2 descriptoin']),
    // executiveSummaryId: "123e4567-e89b-12d3-a456-426614174003", // UUID of Executive Summary
    // executiveSummary: {
    //   id: "123e4567-e89b-12d3-a456-426614174003",
    //   overview: "This is an executive summary.",
    //   keyPoints: ["Market analysis", "Financial projections"],
    //   createdAt: new Date(),
    //   updatedAt: null,
    // },
  
    // dataroomAndMetricsId: "123e4567-e89b-12d3-a456-426614174004", // UUID of DataroomAndMetrics
    // dataroomAndMetrics: {
    //   id: "123e4567-e89b-12d3-a456-426614174004",
    //   metrics: { revenue: "$500K", growth: "20%" },
    //   documents: [{ name: "Financial Report", url: "https://example.com/report.pdf" }],
    //   createdAt: new Date(),
    //   updatedAt: null,
    // },
  
    // businessAndFunctionalRequirementsId: "123e4567-e89b-12d3-a456-426614174005", // UUID of Business & Functional Requirements
    // businessAndFunctionalRequirements: {
    //   id: "123e4567-e89b-12d3-a456-426614174005",
    //   businessRequirements: { text: "Define business objectives", priority: "High" },
    //   functionalRequirements: { text: "System must support 1000 users", priority: "Critical" },
    //   createdAt: new Date(),
    //   updatedAt: null,
    // },
  
    // Additional entities
    userToProjects: [
      { userId: "123e4567-e89b-12d3-a456-426614174001", projectId: "123e4567-e89b-12d3-a456-426614174000", role: "Owner" }
    ],
    
    tasks: [
      { id: "task-001", name: "Define scope", status: "In Progress", assignedTo: "123e4567-e89b-12d3-a456-426614174001" },
      { id: "task-002", name: "Create pitch deck", status: "Pending", assignedTo: "123e4567-e89b-12d3-a456-426614174001" }
    ]
  }
]);

export const selectedProjectAtom = atom<Project | null>(projectsAtom?.[0]);

export const getProjectAtom = (id: Project['id'] | undefined) =>
  atom(get => get(projectsAtom).find(project => project.id === id) || null);


export const addProjectAtom = atom(
  get => get(projectsAtom),
  (get, set, project: Project) => set(projectsAtom, [...get(projectsAtom), project]),
);

export const editProjectAtom = atom(
  get => get(projectsAtom),
  (get, set, project: Project) =>
    set(
      projectsAtom,
      get(projectsAtom).map(p => (p.id === project.id ? project : p)),
    ),
);

export const profilePageProjectsAtom = atom(
  get => get(projectsAtom),
  (get, _, id) => get(projectsAtom).filter(project => project.id === id),
);
