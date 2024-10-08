import { useAtom } from 'jotai';
import {
  createAtom,
  fetchAllAtom,
  fetchEmailCompetenceAtom,
  fetchOneAtom,
} from '../storage/competence.storage';

export const useCompetenceStorage = () => {
  const [competences, fetchAllCompetences] = useAtom(fetchAllAtom);
  const [emailCompetences, fetchEmailCompetences] = useAtom(fetchEmailCompetenceAtom);
  const [selectedCompetence, fetchCompetenceById] = useAtom(fetchOneAtom);
  const [_create, createCompetence] = useAtom(createAtom);

  return {
    emailCompetences,
    competences,
    selectedCompetence,
    createCompetence,
    fetchAllCompetences,
    fetchEmailCompetences,
    fetchCompetenceById,
  };
};
