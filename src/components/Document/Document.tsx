import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { Document as DocumentType } from '../../types/documents.types';
import { ChevronDownIcon, DocxIcon, InfoIcon, PlusIcon, TrashIcon } from '../Icons/Icons';
import { useDocumentStorage } from '../../hooks/document.hooks';
import { useOutsideClick } from '../../hooks/dom.hooks';
import { ApplicationRoutes } from '../../utils/app.utils';
import { useNavigate } from 'react-router';
import { useCompetenceStorage } from '../../hooks/competence.hooks';
import { useUserStorage } from '../../hooks/user.hooks';
import { useAuth } from '../../hooks/auth.hooks';

export interface DocumentProps extends HTMLAttributes<HTMLDivElement> {
  document: DocumentType;
}

const Document: FC<DocumentProps> = ({ document, ...props }) => {
  const { removeDocument } = useDocumentStorage();
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isRatingChangesVisible, setIsRatingChangesVisible] = useState(false);
  const ref = useOutsideClick(() => setIsDetailsVisible(false));
  const { fetchAllCompetences } = useCompetenceStorage();
  const { fetchAllUsers } = useUserStorage();
  const navigate = useNavigate();
  const { authenticatedUser } = useAuth();
  useEffect(() => {
    fetchAllCompetences();
    fetchAllUsers();
  }, []);

  return (
    <div
      ref={ref}
      className='bg-white w-full flex flex-col flex-1 shadow-[5px_5px_20px_-10px_black] rounded-3xl p-10 items-center'
      {...props}
    >
      <div className='flex'>
        <div className='grid grid-cols-[128px_auto] gap-4 items-center flex-1'>
          <div className='flex flex-col max-w-[128px] w-full'>
            <DocxIcon className='size-14 text-stone-600' />
          </div>

          {/* Name and Description section */}
          <div>
            <h4 className='text-xl font-bold'>{document.name}</h4>
            <p className='mt-2 text-lg'>{document.description}</p>
          </div>
        </div>
        <button
          type='button'
          className='p-2'
          onClick={event => {
            event.stopPropagation();
            setIsDetailsVisible(!isDetailsVisible);
            setIsRatingChangesVisible(false);
          }}
        >
          <InfoIcon className='size-8' />
        </button>
        {authenticatedUser?.rateitId === document.creatorId && <button
          type='button'
          className='p-2'
          onClick={event => {
            event.stopPropagation();
            removeDocument(document.id);
          }}
        >
          <TrashIcon className='size-8' />
        </button>}
      </div>
      {isDetailsVisible && (
        <div className='flex flex-col mt-10'>
          <div className='flex gap-5'>
            <div className='flex flex-col flex-1'>
              <h4 className='my-2 text-lg font-bold text-center'>Members</h4>
              <div className='flex flex-col'>
                <div className='flex flex-col gap-2 max-h-[200px] overflow-y-scroll with-scrollbar p-0.5'>
                  {!document.members?.length && (
                    <span className='text-sm text-center'>
                      There are not any members in this document
                    </span>
                  )}
                  {document.members?.map((member, index) => (
                    <div
                      className='flex gap-2'
                      key={index}
                      onClick={() =>
                        navigate(ApplicationRoutes.UserDetails.replace(':id', member.id.toString()))
                      }
                    >
                      <div className='inline-flex flex-1 w-full p-2 font-medium transition-all duration-300 outline-none cursor-pointer rounded-xl bg-grey-primary ring-1 focus:ring-2 ring-stone-200 focus:ring-stone-300 text-stone-600'>
                        <h5>{member.email}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex flex-col flex-1'>
              <h4 className='my-2 text-lg font-bold text-center'>Competences</h4>
              <div className='flex flex-col gap-2 max-h-[200px] overflow-y-scroll with-scrollbar p-0.5'>
                {!document.competences?.length && (
                  <span className='text-sm text-center'>
                    There are not any competences in this document
                  </span>
                )}
                {document.competences?.map((competence, index) => (
                  <div
                    key={index}
                    className='inline-flex flex-1 w-full p-2 font-medium transition-all duration-300 outline-none cursor-pointer rounded-xl bg-grey-primary ring-1 focus:ring-2 ring-stone-200 focus:ring-stone-300 text-stone-600'
                  >
                    <h5>{competence.name}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <span className='mt-10 text-xl'>
            Document rating:{' '}
            <span className='font-bold'>{parseFloat(Number(document.sysRank).toFixed(2))}/10</span>
          </span>
          <div
            className='flex flex-col'
            onClick={event => {
              event.stopPropagation();
              setIsRatingChangesVisible(!isRatingChangesVisible);
            }}
          >
            <div className='flex items-center gap-2 pt-5 text-stone-700'>
              <span className='text-xl font-medium'>View rating changes</span>
              <ChevronDownIcon
                className={`size-6 stroke-2 transition-all duration-300 ${isRatingChangesVisible ? ' rotate-180' : ''}`}
              />
            </div>
            {isRatingChangesVisible && (
              <div className='grid grid-cols-1 xl:grid-cols-2 mt-5 gap-5 max-h-[400px] overflow-y-auto with-scrollbar'>
                {document?.userRatingChange?.map((change, index) => (
                  <div key={index} className='flex flex-col p-5 bg-stone-200 rounded-xl max-'>
                    <span className='overflow-x-scroll font-bold text-center'>
                      {change.email}
                    </span>
                    <div className='mt-5 overflow-y-scroll flex flex-col gap-2 max-h-[150px] with-scrollbar'>
                      {change.changes.map((change, i) => (
                        <div key={i} className='flex gap-1.5 items-center'>
                          <span className='p-1.5 border-2 border-stone-300 rounded-xl bg-stone-100 flex-1'>
                            {change.competence.name}
                          </span>
                          <div className='flex items-center gap-1 text-sm'>
                            {change.finalValue ? change.finalValue : 0} <b>RIT</b>
                          </div>

                          <div className='flex items-center gap-1 text-sm p-1.5 border-2 border-stone-300 rounded-xl bg-stone-100 flex-1'>
                            <PlusIcon className='stroke-2 text-green-primary size-5' />
                            {change.finalValue ? (change.finalValue - change.initValue) : 0} <b>RIT</b></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )
      }
    </div >
  );
};

export default Document;
