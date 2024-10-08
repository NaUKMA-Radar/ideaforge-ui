import { useAtom } from 'jotai';
import {
  createAtom,
  documentsAtom,
  fetchAllAtom,
  fetchOneAtom,
  removeAtom,
  selectedDocumentAtom,
  updateAtom,
} from '../storage/document.storage';

export const useDocumentStorage = () => {
  const [documents, fetchAllDocuments] = useAtom(fetchAllAtom);
  const [selectedDocument, fetchDocumentById] = useAtom(fetchOneAtom);
  const [_createDocument, createDocument] = useAtom(createAtom);
  const [_updateDocument, updateDocument] = useAtom(updateAtom);
  const [_removeDocument, removeDocument] = useAtom(removeAtom);
  const [_documents, setDocumentsInStorage] = useAtom(documentsAtom);
  const [_selectedDocument, setSelectedDocumentInStorage] = useAtom(selectedDocumentAtom);

  return {
    documents,
    selectedDocument,
    fetchAllDocuments,
    fetchDocumentById,
    createDocument,
    updateDocument,
    removeDocument,
    setDocumentsInStorage,
    setSelectedDocumentInStorage,
  };
};
