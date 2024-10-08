import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { ParagraphEdition as ParagraphEditionType } from '../../types/paragraph-editions.types';
import { CommentIcon } from '../Icons/Icons';
import { createPortal } from 'react-dom';
import AddCommentModal from '../AddParagraphCommentModal/AddParagraphCommentModal';
import { useOutsideClick } from '../../hooks/dom.hooks';
import { useParagraphEditionStorage } from '../../hooks/paragraph-edition.hooks';
import ParagraphCommentsListModal from '../ParagraphCommentsListModal/ParagraphCommentsListModal';
import { useAuth } from '../../hooks/auth.hooks';
import { useDocumentStorage } from '../../hooks/document.hooks';
import { Button, RatingInput } from 'components/UI';

export interface ParagraphEditionProps extends HTMLAttributes<HTMLDivElement> {
  paragraphEdition: ParagraphEditionType;
}

const ParagraphEdition: FC<ParagraphEditionProps> = ({ paragraphEdition, ...props }) => {
  const [isCommentsListModalVisible, setIsCommentsListModalVisible] = useState(false);
  const [isAddCommentModalVisible, setIsAddCommentModalVisible] = useState(false);
  const [isOptionsDropdownVisible, setIsOptionsDropdownVisible] = useState(false);
  const [isRatesVisible, setIsRatesVisible] = useState(false);
  const editOptionsRef = useOutsideClick(() => setIsOptionsDropdownVisible(false));
  const { removeParagraphEdition, updateParagraphEdition } = useParagraphEditionStorage();
  const { selectedDocument, fetchDocumentById } = useDocumentStorage();
  const { authenticatedUser } = useAuth();
  const [canUserRate, setCanUserRate] = useState(false);
  const [chosenGradesState, setChosenGradesState] = useState(
    selectedDocument?.competences?.map(competence => ({
      competenceId: competence.id,
      grade:
        paragraphEdition.grades?.find(grade => grade.competenceId === competence.id)?.grade || 0,
    })),
  );
  const [hoveredGradesState, setHoveredGradesState] = useState(chosenGradesState);
  const [isMyGradesVisible, setIsMyGradesVisible] = useState(false);

  console.log('edit', paragraphEdition);

  useEffect(() => {
    if (authenticatedUser && paragraphEdition.grades) {
      setCanUserRate(
        !Boolean(
          paragraphEdition.grades?.find((grade: any) => grade.email === authenticatedUser.email),
        ),
      );
    }
  }, [authenticatedUser, paragraphEdition.grades]);

  return (
    <>
      {isCommentsListModalVisible &&
        createPortal(
          <ParagraphCommentsListModal
            title='Comments'
            onClose={() => setIsCommentsListModalVisible(false)}
            className='max-w-3xl'
            comments={paragraphEdition.comments || []}
          />,
          document.querySelector('body')!,
        )}
      {isAddCommentModalVisible &&
        createPortal(
          <AddCommentModal
            title='Add comment'
            onClose={() => setIsAddCommentModalVisible(false)}
            onProcess={() => setIsAddCommentModalVisible(false)}
            className='max-w-3xl'
            paragraphEdition={paragraphEdition}
            paragraph={paragraphEdition.paragraph!}
          />,
          document.querySelector('body')!,
        )}
      <div className='flex flex-col gap-5 p-5 bg-grey-primary rounded-3xl' {...props}>
        <p
          className='text-xl font-medium overflow-y-auto max-h-[200px] with-scrollbar text-light-primary'
          dangerouslySetInnerHTML={{ __html: paragraphEdition.content }}
        >
          {/* {paragraphEdition.content} */}
        </p>
        <div className='flex items-center justify-between'>
          {!isRatesVisible ? (
            canUserRate ? (
              <button
                type='button'
                className='inline-flex items-center justify-center py-2 text-xl font-bold text-center text-white uppercase transition-all duration-300 bg-blue-primary hover:bg-blue-secondary px-7 rounded-xl'
                onClick={() => setIsRatesVisible(true)}
              >
                Rate it
              </button>
            ) : (
              <Button
                type="button"
                uppercase={true}
                size="md"
                className="rounded-2xl"
                onClick={() => {
                  setIsRatesVisible(true);
                  setIsMyGradesVisible(false);
                }}
              >
                see rates
              </Button>
            )
          ) : canUserRate ? (
            <button
              disabled={Boolean(chosenGradesState?.find(grade => !grade?.grade))}
              type='button'
              className='inline-flex items-center justify-center py-2 text-xl font-bold text-center text-white uppercase transition-all duration-300 bg-blue-primary hover:bg-blue-secondary px-7 rounded-xl disabled:opacity-30'
              onClick={() => {
                if (chosenGradesState && authenticatedUser) {
                  updateParagraphEdition(
                    paragraphEdition.id,
                    {
                      grades: chosenGradesState?.map(grade => ({
                        rateitId: authenticatedUser.rateitId,
                        email: authenticatedUser.email,
                        grade: grade.grade,
                        competenceId: grade.competenceId,
                        editionId: paragraphEdition.id,
                      })),
                    },
                    {
                      onSuccess: () => {
                        if (selectedDocument) {
                          fetchDocumentById(selectedDocument.id, 1);


                        }
                        setIsRatesVisible(false);
                      },
                    },
                  );
                } else {
                  setIsRatesVisible(false);
                }
              }}
            >
              Save rates
            </button>
            ) : (
            <Button
              type="button"
              uppercase={true}
              size="md"
              className="rounded-2xl"
              onClick={() => setIsRatesVisible(false)}
            >
              Close rates
            </Button>
          )}
          <div className='flex flex-col items-center justify-between text-light-primary'>
            <h4 className='text-lg font-bold'>Current rating</h4>
            <p className='text-lg'>
              {parseFloat(Number(paragraphEdition.sysRank).toFixed(2))}
              /10
            </p>
          </div>
        </div>


        {/* </div>

        </div> */}
        <div className='flex flex-col'>
          {isRatesVisible && (
            <><>{paragraphEdition.ratings.map(rating =>
              <div className="relative flex items-center justify-between mt-3">
                <div className="relative flex-1">
                  <div className='flex items-center w-full'>
                    <RatingInput value={rating.sysRank} disabled={true} />
                  </div>
                </div>
              </div>)}</>
              <div className='flex flex-col max-h-[200px] overflow-y-scroll p-0.5 with-scrollbar'>
                {canUserRate && selectedDocument?.competences?.map(competence => (
                  <div
                    key={competence.id}
                    className={`flex items-center ${!canUserRate ? 'opacity-50' : ''}`}
                  >
                    <div className='w-[120px]'>{competence.name}</div>
                    <div className='grid flex-1 grid-cols-10 mx-5'>
                      {Array.from({ length: 10 }, (_, y) => y + 1).map(value => (
                        <div
                          key={value}
                          className='inline-flex p-1 aspect-square'
                          onClick={() => {
                            if (canUserRate) {
                              setChosenGradesState(
                                chosenGradesState?.map(grade => grade.competenceId === competence.id
                                  ? { ...grade, grade: value }
                                  : grade
                                )
                              );
                            }
                          }}
                          onMouseEnter={() => {
                            if (canUserRate) {
                              setHoveredGradesState(
                                hoveredGradesState?.map(grade => grade.competenceId === competence.id
                                  ? { ...grade, grade: value }
                                  : { ...grade, grade: 0 }
                                )
                              );
                            }
                          }}
                          onMouseLeave={() => {
                            if (canUserRate) {
                              setHoveredGradesState(
                                hoveredGradesState?.map(grade => grade.competenceId === competence.id
                                  ? { ...grade, grade: 0 }
                                  : { ...grade, grade: 0 }
                                )
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
                      {paragraphEdition.grades?.find(grade => grade.competenceId === competence.id)
                        ?.grade || 0}
                      /10
                    </div>
                  </div>
                ))}
                {!canUserRate && (
                  <>
                    <span
                      className='my-2 font-bold underline cursor-pointer text-light-primary'
                      onClick={() => setIsMyGradesVisible(!isMyGradesVisible)}
                    >
                      See my grades
                    </span>
                    <div className='space-y-3'>
                      {isMyGradesVisible &&
                        selectedDocument?.competences?.map(competence => (
                          // <div
                          //   key={competence.id}
                          //   className={`flex items-center ${!canUserRate ? 'opacity-50' : ''}`}
                          // >
                          //   <div className='w-[120px]'>{competence.name}</div>
                          //   <div className='grid flex-1 grid-cols-10 mx-5'>
                          //     {Array.from({ length: 10 }, (_, y) => y + 1).map(value => (
                          //       <div
                          //         key={value}
                          //         className='inline-flex p-1 aspect-square'
                          //         onClick={() => {
                          //           if (canUserRate) {
                          //             setChosenGradesState(
                          //               chosenGradesState?.map(grade => grade.competenceId === competence.id
                          //                 ? { ...grade, grade: value }
                          //                 : grade
                          //               )
                          //             );
                          //           }
                          //         }}
                          //         onMouseEnter={() => {
                          //           if (canUserRate) {
                          //             setHoveredGradesState(
                          //               hoveredGradesState?.map(grade => grade.competenceId === competence.id
                          //                 ? { ...grade, grade: value }
                          //                 : { ...grade, grade: 0 }
                          //               )
                          //             );
                          //           }
                          //         }}
                          //         onMouseLeave={() => {
                          //           if (canUserRate) {
                          //             setHoveredGradesState(
                          //               hoveredGradesState?.map(grade => grade.competenceId === competence.id
                          //                 ? { ...grade, grade: 0 }
                          //                 : { ...grade, grade: 0 }
                          //               )
                          //             );
                          //           }
                          //         }}
                          //       >
                          //         <span
                          //           key={value}
                          //           className={`inline-flex font-medium p-2 border rounded-lg items-center justify-center text-center aspect-square ${canUserRate ? 'cursor-pointer' : ''} ${value <= (hoveredGradesState?.find(grade => grade.competenceId === competence.id)?.grade || chosenGradesState?.find(grade => grade.competenceId === competence.id)?.grade || 0) ? 'bg-blue-primary text-white' : ''}`}
                          //         >
                          //           {value}
                          //         </span>
                          //       </div>
                          //     ))}
                          //   </div>
                          //   <div className='w-[90px] text-center'>
                          //     {paragraphEdition.grades?.find(
                          //       grade => grade.competenceId === competence.id
                          //     )?.grade || 0}
                          //     /10
                          //   </div>
                          // </div>
                          <RatingInput value={paragraphEdition.grades?.find(grade => grade.competenceId === competence.id)?.grade || 0} />
                        ))}
                    </div>
                  </>
                )}
              </div></>
          )}
        </div>
        <div className='flex justify-between'>
          <div className='relative flex flex-col'>
            {!paragraphEdition.grades?.find(grade => grade.grade > 0) &&

              <span
                className='text-lg font-semibold transition-all duration-300 cursor-pointer text-light-primary hover:text-green-primary'
                onClick={() => setIsOptionsDropdownVisible(true)}
              >
                Options
              </span>
            }
            {isOptionsDropdownVisible && (
              <div
                ref={editOptionsRef}
                onClick={() => setIsOptionsDropdownVisible(false)}
                className='flex flex-col text-center cursor-pointer absolute left-3/4 min-w-[200px] bg-grey-primary text-sm font-normal rounded-xl shadow-[0_0_20px_-10px_black] bottom-0 overflow-hidden'
              >
                {!paragraphEdition.grades?.find(grade => grade.grade > 0) && (
                  <>
                    <span
                      className='p-2 font-medium transition-all duration-300 hover:bg-grey-secondary'
                      onClick={() => removeParagraphEdition(paragraphEdition.id)}
                    >
                      Delete the edition
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
          <div className='flex items-center gap-5'>
            <span
              className='text-lg font-semibold transition-all duration-300 cursor-pointer text-light-primary hover:text-green-primary'
              onClick={() => setIsAddCommentModalVisible(true)}
            >
              Add comment
            </span>
            <div
              className='relative flex items-end transition-all duration-300 cursor-pointer text-light-primary hover:text-green-primary'
              onClick={() => setIsCommentsListModalVisible(true)}
            >
              <CommentIcon className='size-6' />
              <span className='text-xs font-bold relative -left-1 top-1.5'>
                {paragraphEdition.comments?.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default ParagraphEdition;
