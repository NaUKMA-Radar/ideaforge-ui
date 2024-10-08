import { FC, FormEvent, useEffect, useState } from 'react';
import Modal, { ModalProps } from '../Modal/Modal';
import { useCompetenceStorage } from '../../hooks/competence.hooks';
import { useDocumentStorage } from '../../hooks/document.hooks';
import { User } from '../../types/users.types';
import { Competence, EmailCompetence } from '../../types/competences.types';
import { DownloadIcon, PlusIcon, TrashIcon, XMarkIcon } from '../Icons/Icons';
import { useParams } from 'react-router';
import Spinner from '../Spinner/Spinner';
import { useAuth } from '../../hooks/auth.hooks';
import { useProjectStorage } from '../../hooks/project.hooks';

export interface AddDocumentModalProps extends ModalProps {}
export interface AddDocumentModalState {
  data: {
    document?: string | null;
    description?: string;
    members: Pick<User, 'email'>[];
    competences: Competence[];
    projectId: number;
  };
  error: any | null;
  isLoaded: boolean;
  isLoading: boolean;
}

const initialState: AddDocumentModalState = {
  data: {
    document: null,
    members: [],
    competences: [],
    projectId: 0,
  },
  error: null,
  isLoaded: false,
  isLoading: false,
};

const AddDocumentModal: FC<AddDocumentModalProps> = ({ onProcess, ...props }) => {
  const { authenticatedUser } = useAuth();
  const [state, setState] = useState(initialState);
  const [chosenFile, setChosenFile] = useState<File | null>(null);
  const { competences, emailCompetences, fetchEmailCompetences, fetchAllCompetences } =
    useCompetenceStorage();
  const [prepairedEmCompetences, setPrepairedEmCompetences] = useState<EmailCompetence[]>([]);
  const [prepairedCompetences, setPrepairedCompetences] = useState<Competence[]>([]);
  const { selectedProject } = useProjectStorage();

  const { createDocument } = useDocumentStorage();
  const { id } = useParams();
  useEffect(() => {
    if (!state.isLoaded) {
      setState({ ...state, isLoaded: true });
    } else {
      fetchAllCompetences();
    }
  }, [state.isLoaded, fetchAllCompetences]);

  useEffect(() => {
    if (!state.isLoaded) {
      setState({ ...state, isLoaded: true });
    } else {
      fetchEmailCompetences();
    }
  }, [state.isLoaded]);

  useEffect(() => {
    if (authenticatedUser && emailCompetences.length > 0) {
      emailCompetences.map(ec => {
        if (ec.email === authenticatedUser.email) {
          setPrepairedEmCompetences([ec]);
        }
      });
    }
  }, [emailCompetences, authenticatedUser]);

  useEffect(() => {
    setPrepairedEmCompetences(
      prepairedEmCompetences.filter(
        e =>
          state.data.members.map(m => m.email).includes(e.email) ||
          e.email === authenticatedUser?.email,
      ),
    );
    state.data.members.map(member => {
      emailCompetences.map(ec => {
        if (
          ec.email === member.email &&
          !prepairedEmCompetences.map(pp => pp.email).includes(ec.email)
        ) {
          setPrepairedEmCompetences([...prepairedEmCompetences, ec]);
        }
      });
    });
    console.log('cons + ', prepairedEmCompetences);
  }, [state.data.members]);
  useEffect(() => {
    setPrepairedCompetences(
      prepairedEmCompetences
        .reduce((uniqueCompetences: Competence[], emailCompetence: EmailCompetence) => {
          emailCompetence.competences.forEach(competence => {
            if (!uniqueCompetences.some(c => c.id === competence.id)) {
              uniqueCompetences.push(competence);
            }
          });
          return uniqueCompetences;
        }, [])
        .filter(comp => comp.name),
    );
  }, [prepairedEmCompetences]);

  const validate = (data: AddDocumentModalState['data']) => {
    if (!chosenFile) {
      throw new Error('Document file was not chosen');
    }

    if (!data.description?.trim()) {
      throw new Error('Document description cannot be empty');
    }

    if (!data.competences.length) {
      throw new Error('At least 1 competence has to be provided');
    }

    if (!data.members.length) {
      throw new Error('At least 1 member has to be provided');
    }

    if (data.competences.find(competence => !competence.id || !competence.name.trim())) {
      throw new Error('Some of competences was not chosen');
    }

    if (data.members.find(member => !member.email.trim())) {
      throw new Error('Some of members was not chosen');
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setState(prevState => ({ ...prevState, isLoading: true }));

    try {
      validate(state.data);
      const formData = new FormData();
      formData.set('description', state.data.description!);
      formData.set('projectId', id!);
      state.data.competences.forEach(competence =>
        formData.append('competences[]', competence.id.toString()),
      );
      state.data.members.forEach(member => formData.append('members[]', member.email));

      if (chosenFile) {
        formData.set('file', chosenFile);
      }

      createDocument(formData, {
        onError: error => {
          setState({ ...state, error });
          setState(prevState => ({ ...prevState, isLoading: false }));
        },
        onSuccess: () => {
          onProcess?.();
          setState(prevState => ({ ...prevState, isLoading: false }));
        },
      });
    } catch (error: any) {
      setState({ ...state, error: { message: error.message } });
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  return (
    <Modal {...props}>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        {!state.isLoading && (
          <>
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
            <div className='flex flex-col p-0.5'>
              <div className='flex flex-col w-full'>
                <div
                  className='inline-flex flex-col items-center justify-center mb-5 text-xl rounded-xl py-14 bg-grey-primary'
                  onDrop={event => {
                    event.preventDefault();
                    setChosenFile(event.dataTransfer.files?.[0] || null);
                  }}
                  onDragOver={event => event.preventDefault()}
                >
                  <DownloadIcon className='absolute size-24 text-stone-300' />
                  <div className='relative z-10 flex flex-col items-center justify-center mt-2 font-medium text-stone-700'>
                    <span className='text-xl'>
                      Chosen file: <b>{chosenFile?.name}</b>
                    </span>
                    <p>Paste your document here</p>
                    <p>or</p>
                    <label
                      htmlFor='create-document-image'
                      className='text-center underline transition-all duration-300 cursor-pointer text-stone-700 hover:text-stone-900'
                    >
                      browse your computer
                    </label>
                    <input
                      type='file'
                      accept='.docx'
                      className='hidden'
                      id='create-document-image'
                      onChange={event => {
                        setState({
                          ...state,
                          data: { ...state.data, document: event.target.files?.[0]?.name },
                        });
                        setChosenFile(event.target.files?.[0] || null);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-1'>
                <div className='flex flex-col w-full gap-5'>
                  <div className='flex flex-col'>
                    <textarea
                      defaultValue={state.data.description}
                      placeholder='Document description'
                      className='w-full bg-grey-primary rounded-xl p-3 text-lg outline-none ring-1 focus:ring-2 ring-stone-200 focus:ring-stone-300 transition-all duration-300 font-medium text-stone-600 resize-none min-h-[150px]'
                      onChange={event =>
                        setState({
                          ...state,
                          data: { ...state.data, description: event.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex gap-5'>
                <div className='flex flex-col flex-1'>
                  <h4 className='my-2 text-lg font-bold text-center'>Members</h4>
                  <div className='flex flex-col'>
                    <div className='flex flex-col gap-2 max-h-[200px] overflow-y-scroll with-scrollbar p-0.5'>
                      {!state.data.members.length && (
                        <span className='text-sm font-medium text-center text-stone-500'>
                          Add members to the document
                        </span>
                      )}
                      {state.data.members.map((_, index) => (
                        <div className='flex gap-2' key={index}>
                          <select
                            className='inline-flex flex-1 w-full p-2 font-medium transition-all duration-300 outline-none cursor-pointer rounded-xl bg-grey-primary ring-1 focus:ring-2 ring-stone-200 focus:ring-stone-300 text-stone-600'
                            onChange={event =>
                              setState({
                                ...state,
                                data: {
                                  ...state.data,
                                  members: state.data.members.map((m1, i) =>
                                    index === i
                                      ? selectedProject?.members?.find(
                                          m2 => m2.email === event.target.value,
                                        ) || ({ email: '' } as any)
                                      : m1,
                                  ),
                                },
                              })
                            }
                          >
                            <option value=''>—</option>
                            {selectedProject?.members
                              ?.filter(m =>
                                selectedProject?.members?.map(m1 => m1.email).includes(m.email),
                              )
                              .map(m => (
                                <option
                                  key={m.email}
                                  value={m.email}
                                  disabled={Boolean(
                                    state.data.members.find(m1 => m.email === m1.email),
                                  )}
                                >
                                  {m.email}
                                </option>
                              ))}
                          </select>
                          <button
                            type='button'
                            className='p-2 text-red-500 border rounded-xl'
                            onClick={() =>
                              setState({
                                ...state,
                                data: {
                                  ...state.data,
                                  members: state.data.members.filter((_, i) => i !== index),
                                },
                              })
                            }
                          >
                            <TrashIcon className='size-5' />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      className='self-center mt-3 transition-all duration-300 text-stone-600 enabled:cursor-pointer enabled:hover:text-stone-800 disabled:text-stone-300'
                      type='button'
                      disabled={
                        !selectedProject?.members?.find(
                          m1 => !state.data.members.find(m2 => m1.email === m2.email),
                        ) || Boolean(state.data.members.find(m1 => !m1.email.trim()))
                      }
                      onClick={() =>
                        setState({
                          ...state,
                          data: {
                            ...state.data,
                            members: [...state.data.members, { email: '' } as any],
                          },
                        })
                      }
                    >
                      <PlusIcon className='size-8' />
                    </button>
                  </div>
                </div>
                <div className='flex flex-col flex-1'>
                  <h4 className='my-2 text-lg font-bold text-center'>Competences</h4>
                  <div className='flex flex-col gap-2 max-h-[200px] overflow-y-scroll with-scrollbar p-0.5'>
                    {!state.data.competences.length && (
                      <span className='text-sm font-medium text-center text-stone-500'>
                        Add competences to the team
                      </span>
                    )}
                    {state.data.competences.map((competence, index) => (
                      <div className='flex gap-2' key={index}>
                        <select
                          className='inline-flex flex-1 w-full p-2 font-medium transition-all duration-300 outline-none cursor-pointer rounded-xl bg-grey-primary ring-1 focus:ring-2 ring-stone-200 focus:ring-stone-300 text-stone-600'
                          value={competence.id}
                          onChange={event =>
                            setState({
                              ...state,
                              data: {
                                ...state.data,
                                competences: state.data.competences.map((c1, i) =>
                                  index === i
                                    ? competences.find(
                                        c2 => c2.id === Number(event.target.value),
                                      ) || ({ name: '' } as any)
                                    : c1,
                                ),
                              },
                            })
                          }
                        >
                          <option value=''>—</option>
                          {prepairedCompetences
                            .filter(c =>
                              selectedProject?.competences?.map(c => c.name).includes(c.name),
                            )
                            .map(c => (
                              <option
                                key={c.id}
                                value={c.id}
                                disabled={Boolean(
                                  state.data.competences.find(c1 => c.id === c1.id),
                                )}
                              >
                                {c.name}
                              </option>
                            ))}
                        </select>
                        <button
                          type='button'
                          className='p-2 text-red-500 border rounded-xl'
                          onClick={() =>
                            setState({
                              ...state,
                              data: {
                                ...state.data,
                                competences: state.data.competences.filter((_, i) => i !== index),
                              },
                            })
                          }
                        >
                          <TrashIcon className='size-5' />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    className='self-center mt-3 transition-all duration-300 text-stone-600 enabled:cursor-pointer enabled:hover:text-stone-800 disabled:text-stone-300'
                    type='button'
                    disabled={
                      !competences.find(
                        c1 => !state.data.competences.find(c2 => c1.id === c2.id),
                      ) || Boolean(state.data.competences.find(c1 => !c1.name.trim() || !c1.id))
                    }
                    onClick={() =>
                      setState({
                        ...state,
                        data: {
                          ...state.data,
                          competences: [...state.data.competences, { name: '' } as any],
                        },
                      })
                    }
                  >
                    <PlusIcon className='size-8' />
                  </button>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-start'>
              <button
                type='submit'
                className='inline-flex items-center justify-center py-2 text-xl font-bold text-center text-white uppercase transition-all duration-300 bg-blue-primary hover:bg-blue-secondary px-7 rounded-xl'
              >
                Create
              </button>
            </div>
          </>
        )}
        {state.isLoading && (
          <div className='flex items-center justify-center m-24'>
            <Spinner className='text-gray-200 size-20 animate-spin fill-blue-primary' />
          </div>
        )}
      </form>
    </Modal>
  );
};

export default AddDocumentModal;
