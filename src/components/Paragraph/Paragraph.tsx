import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { Paragraph as ParagraphType } from '../../types/paragraphs.types';
import { CommentIcon } from '../Icons/Icons';
import { createPortal } from 'react-dom';
import ParagraphCommentsListModal from '../ParagraphCommentsListModal/ParagraphCommentsListModal';
import AddCommentModal from '../AddParagraphCommentModal/AddParagraphCommentModal';
import { useOutsideClick } from '../../hooks/dom.hooks';
import { useParagraphStorage } from '../../hooks/paragraph.hooks';
import { useAuth } from '../../hooks/auth.hooks';
import { Button, RatingInput } from 'components/UI';

export interface ParagraphProps extends HTMLAttributes<HTMLDivElement> {
  paragraph: ParagraphType;
}

const Paragraph: FC<ParagraphProps> = ({ paragraph, ...props }) => {
  const [isCommentsListModalVisible, setIsCommentsListModalVisible] = useState(false);
  const [isAddCommentModalVisible, setIsAddCommentModalVisible] = useState(false);
  const [isEditOptionsDropdownVisible, setIsEditOptionsDropdownVisible] = useState(false);
  const editOptionsRef = useOutsideClick(() => setIsEditOptionsDropdownVisible(false));
  const { authenticatedUser } = useAuth();
  const {
    removeParagraph,
    updateParagraph,
    setNewParagraphPosition,
    setSelectedParagraphInStorage,
  } = useParagraphStorage();
  const [isRatesVisible, setIsRatesVisible] = useState(false);
  const [canUserRate, setCanUserRate] = useState(false);
  const [chosenGradesState, setChosenGradesState] = useState(
    paragraph?.document?.competences?.map(competence => ({
      competenceId: competence.id,
      grade: paragraph.grades?.find(grade => grade.competenceId === competence.id)?.grade || 0,
    })),
  );
  const [hoveredGradesState, setHoveredGradesState] = useState(chosenGradesState);
  const [isMyGradesVisible, setIsMyGradesVisible] = useState(false);

  useEffect(() => {
    if (authenticatedUser && paragraph.grades) {
      setCanUserRate(
        !Boolean(paragraph.grades?.find((grade: any) => grade.email === authenticatedUser.email)),
      );
    }
  }, [authenticatedUser, paragraph.grades]);

  return (
    <>
      {isCommentsListModalVisible &&
        createPortal(
          <ParagraphCommentsListModal
            title='Comments'
            onClose={() => setIsCommentsListModalVisible(false)}
            className='max-w-3xl'
            comments={paragraph?.comments}
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
            paragraph={paragraph}
          />,
          document.querySelector('body')!,
        )}

      <div
        {...props}
        className={`${props.className || `bg-grey-primary p-5 rounded-3xl shadow-[5px_5px_20px_-10px_black] flex flex-col gap-5`} ${paragraph.isApproved ? 'ring-2 ring-green-primary' : ''}`}
      >
        <p
          className='text-xl font-medium overflow-y-auto max-h-[200px] with-scrollbar text-white'
          dangerouslySetInnerHTML={{ __html: paragraph.content }}
        ></p>
        <div className='flex items-center justify-between'>
          <div>
            {!isRatesVisible ? (
              paragraph.isApproved ? (
                <><button
                  disabled={true}
                  type='button'
                  className='inline-flex items-center justify-center py-2 text-xl font-bold text-center text-white uppercase transition-all duration-300 bg-emerald-600 hover:bg-blue-secondary px-7 rounded-xl disabled:opacity-30'
                >
                  Already finalized
                </button>
                <Button
                  type="button"
                  uppercase={true}
                  size="md"
                  className="px-20 rounded-2xl"
                  onClick={() => {
                    setIsRatesVisible(true);
                    setIsMyGradesVisible(false);
                  }}
                  >
                    see rates
                  </Button>
                </>
              ) :
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
                    updateParagraph(
                      paragraph.id,
                      {
                        grades: chosenGradesState?.map(grade => ({
                          rateitId: authenticatedUser.rateitId,
                          email: authenticatedUser.email,
                          grade: grade.grade,
                          competenceId: grade.competenceId,
                          paragraphId: paragraph.id,
                        })),
                      },
                      { onSuccess: () => setIsRatesVisible(false) },
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

          </div>
          {paragraph.document?.sysRank && (
            <div className='flex flex-col items-center justify-between text-light-primary'>
              <h4 className='text-lg font-bold'>Current rating</h4>
              <p className='text-lg'>
                {parseFloat(Number(paragraph.document?.sysRank).toFixed(2))}
                /10
              </p>
            </div>
          )}

        </div>

        <div className='flex flex-col'>
          {isRatesVisible && (
            <div className='flex flex-col max-h-[200px] overflow-y-scroll p-0.5 with-scrollbar'>
              {paragraph?.document?.grades?.map(rating =>
                <div className="relative flex items-center justify-between mt-3">
                  <div className="relative flex-1">
                    <div className='flex items-center w-full'>
                      <RatingInput value={paragraph?.document?.sysRank} disabled={true} />
                    </div>
                  </div>
                </div>)}

              {canUserRate && paragraph?.document?.competences?.map(competence => (
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
                              chosenGradesState?.map(grade =>
                                grade.competenceId === competence.id
                                  ? { ...grade, grade: value }
                                  : grade,
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
                    {paragraph.grades?.find(grade => grade.competenceId === competence.id)?.grade ||
                      0}
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
                      paragraph.document?.competences?.map(competence => (
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
                        //               chosenGradesState?.map(grade =>
                        //                 grade.competenceId === competence.id
                        //                   ? { ...grade, grade: value }
                        //                   : grade,
                        //               ),
                        //             );
                        //           }
                        //         }}
                        //         onMouseEnter={() => {
                        //           if (canUserRate) {
                        //             setHoveredGradesState(
                        //               hoveredGradesState?.map(grade =>
                        //                 grade.competenceId === competence.id
                        //                   ? { ...grade, grade: value }
                        //                   : { ...grade, grade: 0 },
                        //               ),
                        //             );
                        //           }
                        //         }}
                        //         onMouseLeave={() => {
                        //           if (canUserRate) {
                        //             setHoveredGradesState(
                        //               hoveredGradesState?.map(grade =>
                        //                 grade.competenceId === competence.id
                        //                   ? { ...grade, grade: 0 }
                        //                   : { ...grade, grade: 0 },
                        //               ),
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
                        //     {paragraph.grades?.find(grade => grade.competenceId === competence.id)
                        //       ?.grade || 0}
                        //     /10
                        //   </div>
                        // </div>
                        <RatingInput value={paragraph.grades?.find(grade => grade.competenceId === competence.id)?.grade || 0} />
                      ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className='flex justify-between'>

          <div className='relative flex flex-col'>
            {!paragraph.document.isFinalised && <span
              className='text-lg font-semibold transition-all duration-300 cursor-pointer text-light-primary hover:text-green-primary'
              onClick={() => setIsEditOptionsDropdownVisible(true)}
            >
              Edit options
            </span>}
            {isEditOptionsDropdownVisible && (
              <div
                ref={editOptionsRef}
                onClick={() => setIsEditOptionsDropdownVisible(false)}
                className='backdrop-blur-xl flex flex-col text-center cursor-pointer absolute left-3/4 min-w-[200px] bg-grey-primary text-sm text-light-primary font-normal rounded-3xl shadow-[0_0_20px_-10px_black] bottom-0 overflow-hidden divide-y'
              >
                {!paragraph.isApproved && (
                  <>
                    <span
                      className='p-2 font-medium transition-all duration-300 hover:bg-grey-secondary'
                      onClick={() => setSelectedParagraphInStorage(paragraph)}
                    >
                      Edit the paragraph
                    </span>
                    <span
                      className='p-2 font-medium transition-all duration-300 hover:bg-grey-secondary'
                      onClick={() => removeParagraph(paragraph.id)}
                    >
                      Delete the paragraph
                    </span>
                  </>
                )}
                <span
                  className='p-2 font-medium transition-all duration-300 hover:bg-grey-secondary'
                  onClick={() => setNewParagraphPosition({ id: paragraph.id, position: 'after' })}
                >
                  Add a paragraph below
                </span>
                <span
                  className='p-2 font-medium transition-all duration-300 hover:bg-grey-secondary'
                  onClick={() => setNewParagraphPosition({ id: paragraph.id, position: 'before' })}
                >
                  Add a paragraph above
                </span>
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
                {paragraph?.comments?.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paragraph;
