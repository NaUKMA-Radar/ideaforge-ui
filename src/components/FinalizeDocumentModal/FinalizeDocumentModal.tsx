import { FC, FormEvent, useEffect, useState } from 'react';
import Modal, { ModalProps } from '../Modal/Modal';
import { Document } from '../../types/documents.types';
import { useAuth } from '../../hooks/auth.hooks';
import { useDocumentStorage } from '../../hooks/document.hooks';

export interface FinalizeDocumentModalProps extends ModalProps {
  document: Document;
}

export interface EditDocumentModalState {
  error: any | null;
  isLoaded: boolean;
  isLoading: boolean;
}
const initialState: EditDocumentModalState = {

  error: null,
  isLoaded: false,
  isLoading: false,
};

const FinalizeDocumentModal: FC<FinalizeDocumentModalProps> = ({
  onProcess,
  document,
  ...props
}) => {
  const [state, setState] = useState(initialState);
  const { authenticatedUser } = useAuth();
  const [canUserRate, setCanUserRate] = useState(false);
  const { updateDocument } = useDocumentStorage();
  const [chosenGradesState, setChosenGradesState] = useState(
    document?.competences?.map(competence => ({
      competenceId: competence.id,
      grade: document.grades?.find(grade => grade.competenceId === competence.id)?.grade || 0,
    })),
  );
  const [hoveredGradesState, setHoveredGradesState] = useState(chosenGradesState);

  useEffect(() => {
    if (authenticatedUser) {
      setCanUserRate(
        !Boolean(document.grades?.find((grade: any) => grade.email === authenticatedUser.email)),
      );
    }
  }, [authenticatedUser, document.grades]);


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (authenticatedUser) {
      const formData = new FormData();
      chosenGradesState?.forEach((grade) => {
        formData.append(`grades[]`, JSON.stringify({
          rateitId: authenticatedUser.rateitId,
          grade: grade.grade,
          competenceId: grade.competenceId,
        }));
      });
      console.log(document.id)
      updateDocument(
        document.id,
        formData, {
        onError: error => {
          setState({ ...state, error });
          setState(prevState => ({ ...prevState, isLoading: false }));
        },
        onSuccess: data => {
          // onProcess?.(data);
          console.log(data)
          setState(prevState => ({ ...prevState, isLoading: false }));
        },
      }
      );
    }
    // setState(prevState => ({ ...prevState, isLoading: true }));

    // try {
    //   const formData = new FormData();
    //   formData.set('description', state.data.description!);
    //   state.data.competences.forEach(competence =>
    //     formData.append('competences[]', competence.id.toString()),
    //   );
    //   state.data.members.forEach(member => formData.append('members[]', member.email));

    //   updateDocument(document.id, formData, {
    //     onError: error => {
    //       setState({ ...state, error });
    //       setState(prevState => ({ ...prevState, isLoading: false }));
    //     },
    //     onSuccess: data => {
    //       onProcess?.(data);
    //       setState(prevState => ({ ...prevState, isLoading: false }));
    //     },
    //   });
    // } catch (error: any) {
    //   setState({ ...state, error: { message: error.message } });
    //   setState(prevState => ({ ...prevState, isLoading: false }));
    // }
  };

  return (
    <Modal {...props}>
      <form
        className='flex flex-col max-h-[200px] overflow-y-scroll p-0.5 with-scrollbar'
        onSubmit={handleSubmit}
      >
        {document?.competences?.map(competence => (
          <div
            key={competence.id}
            className={`flex items-center ${!canUserRate ? 'opacity-50' : ''}`}
          >
            <div className='w-[120px]'>{competence.name}</div>
            <div className='grid grid-cols-10 flex-1 mx-5'>
              {Array.from({ length: 10 }, (_, y) => y + 1).map(value => (
                <div
                  key={value}
                  className='inline-flex aspect-square p-1'
                  onClick={() => {
                    if (canUserRate) {
                      setChosenGradesState(
                        chosenGradesState?.map(grade =>
                          grade.competenceId === competence.id ? { ...grade, grade: value } : grade,
                        ),
                      );
                    }
                  }}
                  onMouseEnter={() => {
                    if (canUserRate) {
                      setHoveredGradesState(
                        hoveredGradesState?.map(grade =>
                          grade.competenceId === competence.id
                            ? { ...grade, grade: value }
                            : { ...grade, grade: 0 },
                        ),
                      );
                    }
                  }}
                  onMouseLeave={() => {
                    if (canUserRate) {
                      setHoveredGradesState(
                        hoveredGradesState?.map(grade =>
                          grade.competenceId === competence.id
                            ? { ...grade, grade: 0 }
                            : { ...grade, grade: 0 },
                        ),
                      );
                    }
                  }}
                >
                  <span
                    key={value}
                    className={`inline-flex font-medium p-2 border rounded-lg items-center justify-center text-center aspect-square ${canUserRate ? 'cursor-pointer' : ''} ${value <= (hoveredGradesState?.find(grade => grade.competenceId === competence.id)?.grade || chosenGradesState?.find(grade => grade.competenceId === competence.id)?.grade || 0) ? 'bg-blue-primary text-white' : ''}`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className='w-[90px] text-center'>
              {document.grades?.find(grade => grade.competenceId === competence.id)?.grade || 0}
              /10
            </div>
          </div>
        ))}

        {authenticatedUser?.rateitId === document.creatorId && <button
          disabled={Boolean(chosenGradesState?.find(grade => !grade?.grade))}
          type='submit'
          className='text-lg uppercase disabled:opacity-30 inline-flex text-center justify-center items-center bg-green-primary hover:bg-green-secondary py-2 px-7 self-start mt-7 text-white font-bold transition-all duration-300 rounded-xl'
        >
          Finalize
        </button>}
      </form>
    </Modal>
  );
};

export default FinalizeDocumentModal;
