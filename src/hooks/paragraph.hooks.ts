import { useAtom } from 'jotai';
import {
  paragraphsAtom,
  createAtom,
  fetchByDocumentAtom,
  fetchOneAtom,
  selectedParagraphAtom,
  removeAtom,
  newParagraphPositionAtom,
  updateAtom,
} from '../storage/paragraph.storage';

export const useParagraphStorage = () => {
  const [paragraphs, fetchAllParagraphs] = useAtom(fetchByDocumentAtom);
  const [selectedParagraph, fetchParagraphById] = useAtom(fetchOneAtom);
  const [newParagraphPosition, setNewParagraphPosition] = useAtom(newParagraphPositionAtom);
  const [_create, createParagraph] = useAtom(createAtom);
  const [_update, updateParagraph] = useAtom(updateAtom);
  const [_selectedParagraph, setSelectedParagraphInStorage] = useAtom(selectedParagraphAtom);
  const [_paragraphs, setParagraphsInStorage] = useAtom(paragraphsAtom);
  const [_remove, removeParagraph] = useAtom(removeAtom);

  return {
    paragraphs,
    selectedParagraph,
    newParagraphPosition,
    fetchAllParagraphs,
    fetchParagraphById,
    createParagraph,
    updateParagraph,
    removeParagraph,
    setSelectedParagraphInStorage,
    setParagraphsInStorage,
    setNewParagraphPosition,
  };
};
