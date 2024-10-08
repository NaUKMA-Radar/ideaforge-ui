import { useAtom } from 'jotai';
import {
  paragraphEditionsAtom,
  createAtom,
  fetchAllAtom,
  fetchOneAtom,
  selectedParagraphEditionAtom,
  removeAtom,
  fetchAllForParagraphAtom,
  updateAtom,
} from '../storage/paragraph-edition.storage';

export const useParagraphEditionStorage = () => {
  const [paragraphEditions, fetchAllParagraphEditions] = useAtom(fetchAllAtom);
  const [selectedParagraphEdition, fetchParagraphEditionById] = useAtom(fetchOneAtom);
  const [paragraphEditionsForSelectedParagraph, fetchAllParagraphEditionsForParagraph] =
    useAtom(fetchAllForParagraphAtom);
  const [_create, createParagraphEdition] = useAtom(createAtom);
  const [_update, updateParagraphEdition] = useAtom(updateAtom);
  const [_remove, removeParagraphEdition] = useAtom(removeAtom);
  const [_selectedParagraphEditions, setSelectedParagraphEditionInStorage] = useAtom(
    selectedParagraphEditionAtom,
  );
  const [_paragraphEditions, setParagraphEditionsInStorage] = useAtom(paragraphEditionsAtom);
  
  return {
    paragraphEditions,
    selectedParagraphEdition,
    paragraphEditionsForSelectedParagraph,
    fetchAllParagraphEditions,
    fetchParagraphEditionById,
    fetchAllParagraphEditionsForParagraph,
    createParagraphEdition,
    updateParagraphEdition,
    removeParagraphEdition,
    setSelectedParagraphEditionInStorage,
    setParagraphEditionsInStorage,
  };
};
