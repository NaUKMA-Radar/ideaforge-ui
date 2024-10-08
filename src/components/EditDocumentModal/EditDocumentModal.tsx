import { FC, FormEvent, useEffect, useState } from 'react';
import { Document } from '../../types/documents.types';
import Modal, { ModalProps } from '../Modal/Modal';
import { PlusIcon, TrashIcon, XMarkIcon } from '../Icons/Icons';
import { useCompetenceStorage } from '../../hooks/competence.hooks';
import { useDocumentStorage } from '../../hooks/document.hooks';
import { Competence } from '../../types/competences.types';
import { User } from '../../types/users.types';
import Spinner from '../Spinner/Spinner';

export interface EditDocumentModalProps extends ModalProps {
  document: Document;
}

export interface EditDocumentModalState {
  data: {
    description?: Document['description'];
    members: Pick<User, 'email'>[];
    competences: Competence[];
  };
  error: any | null;
  isLoaded: boolean;
  isLoading: boolean;
}

const initialState: EditDocumentModalState = {
  data: {
    members: [],
    competences: [],
  },
  error: null,
  isLoaded: false,
  isLoading: false,
};

const EditDocumentModal: FC<EditDocumentModalProps> = ({ document, onProcess, ...props }) => {
  const [state, setState] = useState(initialState);
  const { updateDocument } = useDocumentStorage();
  const { competences, fetchAllCompetences } = useCompetenceStorage();
  const { selectedDocument } = useDocumentStorage();

  useEffect(() => {
    if (!state.isLoaded) {
      setState({
        ...state,
        data: {
          description: document.description,
          competences: document.competences || [],
          members: document.members?.map(member => ({ email: member.email })) || [],
        },
        isLoaded: true,
      });
    } else {
      fetchAllCompetences();
    }
  }, [state.isLoaded, fetchAllCompetences]);

  const validate = (data: EditDocumentModalState['data']) => {
    if (!data.description?.trim()) {
      throw new Error('Document description cannot be empty');
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
      state.data.competences.forEach(competence =>
        formData.append('competences[]', competence.id.toString()),
      );
      state.data.members.forEach(member => formData.append('members[]', member.email));
      if (selectedDocument) {
        console.log(JSON.stringify(selectedDocument))
        updateDocument(selectedDocument.id, formData, {
          onError: error => {
            setState({ ...state, error });
            setState(prevState => ({ ...prevState, isLoading: false }));
          },
          onSuccess: data => {
            onProcess?.(data);
            setState(prevState => ({ ...prevState, isLoading: false }));
          },
        });
      }
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
              <span className='inline-flex justify-between items-center text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2'>
                {state.error?.message}
                <span
                  className='inline-flex cursor-pointer hover:text-red-600 transition-all duration-300 p-2'
                  onClick={() => setState({ ...state, error: null })}
                >
                  <XMarkIcon className='size-3 stroke-[5px]' />
                </span>
              </span>
            )}
            <div className='flex flex-col p-0.5'>
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
                  <h4 className='font-bold text-lg text-center my-2'>Members</h4>
                  <div className='flex flex-col'>
                    <div className='flex flex-col gap-2 max-h-[200px] overflow-y-scroll with-scrollbar p-0.5'>
                      {!state.data.members.length && (
                        <span className='text-stone-500 text-sm font-medium text-center'>
                          Add members to the document
                        </span>
                      )}
                      {state.data.members.map((m, index) => (
                        <div className='flex gap-2' key={index}>
                          <select
                            className='inline-flex w-full flex-1 rounded-xl p-2 cursor-pointer bg-grey-primary outline-none ring-1 focus:ring-2 ring-stone-200 focus:ring-stone-300 transition-all duration-300 font-medium text-stone-600'
                            value={m.email}
                            onChange={event =>
                              setState({
                                ...state,
                                data: {
                                  ...state.data,
                                  members: state.data.members.map((m1, i) =>
                                    index === i
                                      ? document.project?.members?.find(
                                        m2 => m2.email === event.target.value,
                                      ) || ({ email: '' } as any)
                                      : m1,
                                  ),
                                },
                              })
                            }
                          >
                            <option value=''>—</option>
                            {document.project?.members
                              ?.filter(m =>
                                document.project?.members?.map(m1 => m1.email).includes(m.email),
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
                            className='text-red-500 p-2 rounded-xl border'
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
                      className='text-stone-600 self-center enabled:cursor-pointer enabled:hover:text-stone-800 disabled:text-stone-300 transition-all duration-300 mt-3'
                      type='button'
                      disabled={
                        !document.project?.members?.find(
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
                  <h4 className='font-bold text-lg text-center my-2'>Competences</h4>
                  <div className='flex flex-col gap-2 max-h-[200px] overflow-y-scroll with-scrollbar p-0.5'>
                    {!state.data.competences.length && (
                      <span className='text-stone-500 text-sm font-medium text-center'>
                        Add competences to the team
                      </span>
                    )}
                    {state.data.competences.map((competence, index) => (
                      <div className='flex gap-2' key={index}>
                        <select
                          className='inline-flex w-full flex-1 rounded-xl p-2 cursor-pointer bg-grey-primary outline-none ring-1 focus:ring-2 ring-stone-200 focus:ring-stone-300 transition-all duration-300 font-medium text-stone-600'
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
                          {competences.map(c => (
                            <option
                              key={c.id}
                              value={c.id}
                              disabled={Boolean(state.data.competences.find(c1 => c.id === c1.id))}
                            >
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <button
                          type='button'
                          className='text-red-500 p-2 rounded-xl border'
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
                    className='text-stone-600 self-center enabled:cursor-pointer enabled:hover:text-stone-800 disabled:text-stone-300 transition-all duration-300 mt-3'
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
                className='text-xl uppercase inline-flex text-center justify-center items-center bg-blue-primary hover:bg-blue-secondary py-2 px-7 text-white font-bold transition-all duration-300 rounded-xl'
              >
                Save changes
              </button>
            </div>
          </>
        )}
        {state.isLoading && (
          <div className='flex m-24 items-center justify-center'>
            <Spinner className='size-20 text-gray-200 animate-spin fill-blue-primary' />
          </div>
        )}
      </form>
    </Modal>
  );
};

export default EditDocumentModal;
