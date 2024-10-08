import { useAtom } from 'jotai';
import {
  fetchAllAtom,
  createAtom,
  fetchOneAtom,
  updateAtom,
  selectedUserAtom,
  usersAtom,
  deleteUserCompetenceAtom,
} from '../storage/user.storage';

export const useUserStorage = () => {
  const [users, fetchAllUsers] = useAtom(fetchAllAtom);
  const [selectedUser, fetchUserById] = useAtom(fetchOneAtom);
  const [_createUser, createUser] = useAtom(createAtom);
  const [_updateUser, updateUser] = useAtom(updateAtom);
  const [_selectedUser, setSelectedUserInStorage] = useAtom(selectedUserAtom);
  const [_users, setUsersInStorage] = useAtom(usersAtom);
  const [_deleteUserCompetence, deleteUserCompetence] = useAtom(deleteUserCompetenceAtom);

  return {
    users,
    selectedUser,
    fetchAllUsers,
    fetchUserById,
    createUser,
    updateUser,
    setSelectedUserInStorage,
    setUsersInStorage,
    deleteUserCompetence,
  };
};
