import { FC, Fragment, HTMLAttributes, useEffect, useState } from 'react';
import { useDocumentStorage } from '../../hooks/document.hooks';
import { useParams } from 'react-router';
import Paragraph from '../../components/Paragraph/Paragraph';
import { useParagraphStorage } from '../../hooks/paragraph.hooks';
import { ParagraphEdition as ParagraphEditionType } from '../../types/paragraph-editions.types';
import { Paragraph as ParagraphType } from '../../types/paragraphs.types';
import ParagraphEdition from '../../components/ParagraphEdition/ParagraphEdition';
import { Document } from '../../types/documents.types';
import { Editor } from '@tinymce/tinymce-react';
import { useParagraphEditionStorage } from '../../hooks/paragraph-edition.hooks';
import { useAuth } from '../../hooks/auth.hooks';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '../../components/Icons/Icons';
import EditDocumentModal from '../../components/EditDocumentModal/EditDocumentModal';
import { ApplicationRoutes, downloadBlob } from '../../utils/app.utils';
import axios from 'axios';
import FinalizeDocumentModal from '../../components/FinalizeDocumentModal/FinalizeDocumentModal';
import { Button } from 'components/UI';

export interface DocumentDetailsParagraphsSectionProps extends HTMLAttributes<HTMLDivElement> {
  document: Document;
  page: number;
  setPage: (page: number) => any;
}

export interface DocumentDetailsPageState {
  isLoaded: boolean;
  isForbidden: boolean;
}

export interface ParagraphEditionState {
  data: {
    content?: ParagraphEditionType['content'];
  };
  error: any | null;
}

export interface NewParagraphState {
  data: {
    content?: ParagraphEditionType['content'];
  };
  error: any | null;
}

const initialState: DocumentDetailsPageState = {
  isLoaded: false,
  isForbidden: false,
};

const initialParagraphEditionState: ParagraphEditionState = {
  data: {},
  error: null,
};

const initialNewParagraphState: NewParagraphState = {
  data: {},
  error: null,
};

const DocumentDetailsPage: FC = () => {
  const { id } = useParams();
  const [state, setState] = useState(initialState);
  const { selectedDocument, fetchDocumentById, setSelectedDocumentInStorage } =
    useDocumentStorage();
  const [isEditDocumentModalVisible, setIsEditDocumentModalVisible] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [isFinalizeDocumentModalVisible, setIsFinalizeDocumentModalVisible] = useState(false);
  const { authenticatedUser } = useAuth();

  useEffect(() => {
    if (!state.isLoaded) {
      setState({ ...state, isLoaded: true });
    } else {
      if (authenticatedUser || true) {
        fetchDocumentById(Number(id), page, {
          onSuccess: document => {
            if (!document.members?.find((member: any) => member.id === authenticatedUser?.id || true)) {
              setState({ ...state, isForbidden: true });
            }
          },
        });
      }
    }

    return () => {
      setSelectedDocumentInStorage(null);
    };
  }, [id, state.isLoaded, page, authenticatedUser]);

  const handleDownload = async () => {
    if (selectedDocument) {
      const response = await axios.get(`documents/file/${selectedDocument.id}`, {
        responseType: 'blob',
      });
      const blob = response.data;
      downloadBlob(blob, selectedDocument.name);
    }
  };

  return state.isForbidden ? (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='text-center'>
        <h1 className='font-bold text-9xl text-stone-400'>403</h1>
        <h2 className='mt-4 text-4xl font-semibold text-gray-800'>Access Forbidden</h2>
        <p className='mt-2 text-lg text-gray-600'>You do not have permission to view this page.</p>
        <a
          href={ApplicationRoutes.Root}
          className='inline-block px-6 py-3 mt-6 text-xl font-medium text-white transition-all duration-300 rounded-md bg-blue-primary hover:bg-blue-secondary'
        >
          Go to Home
        </a>
      </div>
    </div>
  ) : (
    state.isLoaded && selectedDocument && (
      <>
        {isEditDocumentModalVisible && (
          <EditDocumentModal
            document={selectedDocument}
            title='Edit document'
            className='max-w-3xl'
            onClose={() => setIsEditDocumentModalVisible(false)}
            onProcess={() => setIsEditDocumentModalVisible(false)}
          />
        )}
        {isFinalizeDocumentModalVisible && (
          <FinalizeDocumentModal
            document={selectedDocument}
            title='Finalize document'
            className='max-w-3xl'
            onClose={() => setIsFinalizeDocumentModalVisible(false)}
            onProcess={() => setIsFinalizeDocumentModalVisible(false)}
          />
        )}
        <div className='flex flex-col flex-1'>
          {/* <div className='px-5'>
            <Navbar buttons={['back', 'notifications', 'profile']} />
          </div> */}
          <div className='flex flex-1 gap-10 px-10 pb-3.5'>
            <DocumentDetailsParagraphsSection
              document={selectedDocument}
              page={page}
              setPage={setPage}
            />
            <DocumentDetailsEditionsForSelectedParagraphSection />
          </div>
          <div className='grid grid-rows-1 grid-cols-4 auto-cols-fr gap-5 self-start px-10 pb-7 pt-3.5'>
            {authenticatedUser?.rateitId === selectedDocument.creatorId && <Button
              disabled={Boolean(
                (selectedDocument.paragraphs?.find(paragraph => !paragraph.isApproved)) || (selectedDocument.isFinalised)
              )}
              type='submit'
              uppercase={true}
              size="md"
              className="rounded-2xl"
              onClick={() => setIsFinalizeDocumentModalVisible(true)}
            >
              Submit the final version
            </Button>}
            <button
              disabled={true}
              type='button'
              className="border-2 border-green-primary text-green-primary uppercase hover:bg-green-primary hover:text-dark-primary rounded-2xl px-4 py-3 font-[900] text-lg font-mono transition-all duration-1000"
              onClick={() => handleDownload()}
            >
              download the final document
            </button>

            {!selectedDocument.isFinalised && (authenticatedUser?.rateitId === selectedDocument.creatorId) && <button
              type='button'
              className='inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-center text-white uppercase transition-all duration-300 bg-blue-primary hover:bg-blue-secondary rounded-2xl'
              onClick={() => setIsEditDocumentModalVisible(true)}
            >
              Edit document
            </button>}
            {/* <button
              type='button'
              className='inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-center text-white uppercase transition-all duration-300 bg-red-500 hover:bg-red-600 rounded-2xl'
              onClick={() =>
                removeDocument(selectedDocument.id, {
                  onSuccess: () =>
                    navigate(
                      ApplicationRoutes.ProjectDetails.replace(
                        ':id',
                        selectedDocument.project?.id?.toString() || '',
                      ),
                    ),
                })
              }
            >
              Remove document
            </button> */}
          </div>
        </div>
      </>
    )
  );
};

const tinymceStyles = `
  .mce-content-body {
    background-color: transparent;
    color: white;
  }
  .tox-edit-area__iframe {
    background-color: transparent !important;
  }
`;

const DocumentDetailsParagraphsSection: FC<DocumentDetailsParagraphsSectionProps> = ({
  page,
  setPage,
  document,
  ...props
}) => {
  const {
    selectedParagraph,
    newParagraphPosition,
    setSelectedParagraphInStorage,
    setNewParagraphPosition,
    createParagraph,
  } = useParagraphStorage();
  const { authenticatedUser } = useAuth();
  const [state, setState] = useState(initialNewParagraphState);

  useEffect(() => {
    setState(initialNewParagraphState);
  }, [newParagraphPosition]);

  const validate = (data: NewParagraphState['data']) => {
    if (!authenticatedUser) {
      throw new Error('The user is not authenticated to perform this action');
    }

    if (!data.content?.trim()) {
      throw new Error('The content of the new paragraph cannot be empty');
    }
  };

  const handleSaveParagraph = (paragraph: ParagraphType) => {
    try {
      validate(state.data);
      createParagraph(
        {
          creatorId: authenticatedUser!.rateitId,
          content: state.data.content!,
          documentId: document.id,
          orderId: paragraph.orderId + 1 * (newParagraphPosition?.position === 'after' ? 1 : -1),
        },
        { onError: error => setState({ ...state, error }) },
      );
      setNewParagraphPosition(null);
    } catch (error: any) {
      setState({ ...state, error: { message: error.message } });
    }
  };

  return (
    <div
      className='flex flex-col flex-1 overflow-y-scroll with-scrollbar bg-grey-tertiary rounded-3xl p-7'
      {...props}
    >
      <h3 className='font-mono text-3xl font-bold text-center text-light-primary pb-7'>Paragraphs</h3>
      <div className='relative flex flex-col flex-1'>
        <div className='overflow-x-hidden overflow-y-scroll with-scrollbar ms-5 -me-5'>
          <div className='flex flex-col gap-5 py-3 ps-1 pe-5'>
            {document.paragraphs
              ?.sort((a: ParagraphType, b: ParagraphType) => {
                if (a.orderId > b.orderId) return 1;
                if (a.orderId < b.orderId) return -1;
                return 0;
              })
              .map(paragraph => (
                <Fragment key={paragraph.id}>
                  {newParagraphPosition &&
                    newParagraphPosition.id === paragraph.id &&
                    newParagraphPosition.position === 'before' && (
                      <div className='flex flex-col gap-5 p-5 bg-grey-secondary rounded-xl'>
                        {state.error?.message && (
                          <span className='inline-flex items-center justify-between px-3 py-2 text-red-500 border border-red-200 rounded-lg bg-red-50'>
                            {state.error?.message}
                            <span
                              className='inline-flex p-2 transition-all duration-300 cursor-pointer hover:text-red-600'
                              onClick={() => setState({ ...state, error: null })}
                            >
                              <XMarkIcon className='size-3 stroke-[5px]' />
                            </span>
                          </span>
                        )}
                        <Editor
                        // apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                          apiKey='rvx9xps2ygkxbnb1na82932mxx71wjaa7vgo91tqnbxx5d0m'
                          init={{
                            height: 300,
                            skin: 'oxide-dark',
                            content_css: 'dark',
                            content_style: tinymceStyles,
                          }}
                          value={state.data.content}
                          onEditorChange={content => {
                            setState({
                              ...state,
                              data: { ...state.data, content },
                              error: null,
                            });
                          }}
                        />
                        <div className='flex gap-2'>
                          <button
                              type="button"
                              className="border-2 border-green-primary text-green-primary uppercase hover:bg-green-primary hover:text-dark-primary rounded-2xl px-4 py-3 font-[900] text-lg font-mono transition-all duration-1000 flex-1"
                              onClick={() => handleSaveParagraph(paragraph)}
                          >
                              Save
                          </button>
                          <button
                              type="button"
                              className="bg-gradient-white-purple text-white uppercase rounded-2xl px-4 py-3 font-[900] text-lg font-mono transition-all duration-300 flex-1"
                              onClick={() => setNewParagraphPosition(null)}
                          >
                              Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  <Paragraph
                    paragraph={{ ...paragraph, document }}
                    className={`p-5 rounded-3xl shadow-[5px_5px_20px_-10px_black] flex flex-col gap-5 ${selectedParagraph?.id === paragraph.id ? 'bg-grey-secondary' : 'bg-grey-primary'}`}
                    onClick={() => setSelectedParagraphInStorage(paragraph)}
                  />
                  {newParagraphPosition &&
                    newParagraphPosition.id === paragraph.id &&
                    newParagraphPosition.position === 'after' && (
                      <div className='flex flex-col gap-5 p-5 bg-grey-secondary rounded-xl'>
                        {state.error?.message && (
                          <span className='inline-flex items-center justify-between px-3 py-2 text-red-500 border border-red-200 rounded-lg bg-red-50'>
                            {state.error?.message}
                            <span
                              className='inline-flex p-2 transition-all duration-300 cursor-pointer hover:text-red-600'
                              onClick={() => setState({ ...state, error: null })}
                            >
                              <XMarkIcon className='size-3 stroke-[5px]' />
                            </span>
                          </span>
                        )}
                        <Editor
                          // apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                          apiKey='rvx9xps2ygkxbnb1na82932mxx71wjaa7vgo91tqnbxx5d0m'
                          init={{
                            height: 300,
                            skin: 'oxide-dark',
                            content_css: 'dark',
                            content_style: tinymceStyles,
                          }}
                          value={state.data.content}
                          onEditorChange={content => {
                            setState({
                              ...state,
                              data: { ...state.data, content },
                              error: null,
                            });
                          }}
                        />
                        <div className='flex gap-2'>
                          <button
                              type="button"
                              className="border-2 border-green-primary text-green-primary uppercase hover:bg-green-primary hover:text-dark-primary rounded-2xl px-4 py-3 font-[900] text-lg font-mono transition-all duration-1000 flex-1"
                              onClick={() => handleSaveParagraph(paragraph)}
                          >
                              Save
                          </button>
                          <button
                              type="button"
                              className="bg-gradient-white-purple text-white uppercase rounded-2xl px-4 py-3 font-[900] text-lg font-mono transition-all duration-300 flex-1"
                              onClick={() => setNewParagraphPosition(null)}
                          >
                              Cancel
                          </button>
                        </div>
                      </div>
                    )}
                </Fragment>
              ))}
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center gap-2 px-5 pt-7'>
        <button
          disabled={page < 2}
          type='button'
          className='p-2 text-white transition-all duration-300 rounded-lg bg-blue-primary hover:bg-blue-secondary disabled:opacity-30'
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          <ChevronLeftIcon className='size-6' />
        </button>
        <span className='inline-flex items-center justify-center h-full p-2 font-medium bg-white border rounded-lg aspect-square'>
          {page}
        </span>
        <button
          disabled={page > document.pageCount}
          type='button'
          className='p-2 text-white transition-all duration-300 rounded-lg bg-blue-primary hover:bg-blue-secondary disabled:opacity-30'
          onClick={() => {
            if (page <= document.pageCount) {
              setPage(page + 1);
            }
          }}
        >
          <ChevronRightIcon className='size-6' />
        </button>
      </div>
    </div>
  );
};

const DocumentDetailsEditionsForSelectedParagraphSection: FC = ({ ...props }) => {
  const { selectedParagraph } = useParagraphStorage();
  const [state, setState] = useState(initialParagraphEditionState);
  const { paragraphEditionsForSelectedParagraph, fetchAllParagraphEditionsForParagraph } =
    useParagraphEditionStorage();
  const { createParagraphEdition } = useParagraphEditionStorage();
  const { selectedDocument, fetchDocumentById } = useDocumentStorage();
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const { authenticatedUser } = useAuth()

  const validate = (data: ParagraphEditionState['data']) => {
    if (!data.content?.trim()) {
      throw new Error('Paragraph edition content cannot be empty');
    }
  };

  const handleAddEdition = () => {

    try {
      validate(state.data);
      if (selectedParagraph && selectedDocument && authenticatedUser) {
        createParagraphEdition(
          {
            creatorId: authenticatedUser.rateitId,
            content: state.data.content!,
            paragraphId: selectedParagraph.id,
          },
          {
            onSuccess: () => {
              fetchDocumentById(selectedDocument.id, 1)
            },
          },
        );
      }
    } catch (error: any) {
      setState({ ...state, error: { message: error.message } });
    }
  };

  useEffect(() => {
    if (selectedParagraph) {
      setState({ ...state, data: { ...state.data, content: selectedParagraph.content } });
      fetchAllParagraphEditionsForParagraph(selectedParagraph.id);
    }
  }, [selectedParagraph]);

  return (
    <div
      className='flex flex-col flex-1 overflow-y-scroll with-scrollbar bg-grey-tertiary rounded-3xl p-7'
      {...props}
    >
      <h3 className='font-mono text-3xl font-bold text-center text-light-primary pb-7'>Editions for selected paragraph</h3>
      {selectedParagraph && (
        <div className='relative flex flex-col flex-1'>
          <div className='absolute top-0 bottom-0 left-0 right-0 overflow-y-scroll overflow-x-hidden with-scrollbar ms-5 -me-5 px-0.5'>
            <div className='flex flex-col gap-5 py-3 pe-5'>
              {!selectedDocument?.isFinalised && (isEditorVisible ?
                (
                  <>
                    <div className='flex flex-col bg-grey-primary rounded-xl'>
                      <Editor
                        // apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        apiKey='rvx9xps2ygkxbnb1na82932mxx71wjaa7vgo91tqnbxx5d0m'
                        init={{
                          height: 300,
                          skin: 'oxide-dark',
                          content_css: 'dark',
                          content_style: tinymceStyles,
                        }}
                        value={state.data.content}
                        onEditorChange={content => {
                          setState({
                            ...state,
                            data: { ...state.data, content },
                            error: null,
                          });
                        }}
                      />
                    </div>
                    <div className='flex gap-2'>

                      <button
                          type="button"
                          className="border-2 border-green-primary text-green-primary uppercase hover:bg-green-primary hover:text-dark-primary rounded-2xl px-4 py-3 font-[900] text-lg font-mono transition-all duration-1000 flex-1"
                          onClick={() => handleAddEdition()}
                      >
                        add edition
                      </button>
                      <button
                          type="button"
                          className="bg-gradient-white-purple text-white uppercase rounded-2xl px-4 py-3 font-[900] text-lg font-mono transition-all duration-300 flex-1"
                          onClick={() => setIsEditorVisible(false)}
                      >
                        cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className='flex flex-col items-start'>
                    <button
                      type="button"
                      className="border-2 border-green-primary text-green-primary uppercase hover:bg-green-primary hover:text-dark-primary rounded-2xl px-4 py-3 font-[900] text-lg font-mono transition-all duration-1000"
                      onClick={() => setIsEditorVisible(true)}
                    >
                      add edition
                    </button>
                  </div>
                ))
              }
              <div className='flex flex-col gap-5'>
                <h3 className='my-3 text-xl text-light-primary'>Previous text versions: </h3>
                {!(selectedParagraph.editions?.length! < 0) && (
                  <span className='text-light-primary'>This paragraph has no any editions yet</span>
                )}
                {paragraphEditionsForSelectedParagraph
                  .sort((a, b) => {
                    if (a.sysRank > b.sysRank) return -1;
                    if (a.sysRank < b.sysRank) return 1;
                    return 0;
                  })
                  .map(edition => (
                    <ParagraphEdition
                      key={edition.id}
                      paragraphEdition={{ ...edition, paragraph: selectedParagraph }}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentDetailsPage;
