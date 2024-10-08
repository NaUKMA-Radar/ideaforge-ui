import { useAtom } from 'jotai';
import {
  createAtom,
  fetchAllAtom,
  fetchOneAtom,
  removeAtom,
  selectedTeamAtom,
  teamsAtom,
  updateAtom,
} from '../storage/team.storage';

export const useTeamStorage = () => {
  const [teams, fetchAllTeams] = useAtom(fetchAllAtom);
  const [selectedTeam, fetchTeamById] = useAtom(fetchOneAtom);
  const [_createTeam, createTeam] = useAtom(createAtom);
  const [_updateTeam, updateTeam] = useAtom(updateAtom);
  const [_removeTeam, removeTeam] = useAtom(removeAtom);
  const [_selectedTeam, setSelectedTeamInStorage] = useAtom(selectedTeamAtom);
  const [_teams, setTeamsInStorage] = useAtom(teamsAtom);

  return {
    teams,
    selectedTeam,
    fetchAllTeams,
    fetchTeamById,
    createTeam,
    updateTeam,
    removeTeam,
    setSelectedTeamInStorage,
    setTeamsInStorage,
  };
};
