import { useAtom } from 'jotai';
import {
  commentsAtom,
  createAtom,
  fetchAllAtom,
  fetchOneAtom,
  selectedCommentAtom,
} from '../storage/comment.storage';

export const useCommentStorage = () => {
  const [comments, fetchAllComments] = useAtom(fetchAllAtom);
  const [selectedComment, fetchCommentById] = useAtom(fetchOneAtom);
  const [_create, createComment] = useAtom(createAtom);
  const [_selectedComment, setSelectedCommentInStorage] = useAtom(selectedCommentAtom);
  const [_comments, setCommentsInStorage] = useAtom(commentsAtom);

  return {
    comments,
    selectedComment,
    fetchAllComments,
    fetchCommentById,
    createComment,
    setSelectedCommentInStorage,
    setCommentsInStorage,
  };
};
