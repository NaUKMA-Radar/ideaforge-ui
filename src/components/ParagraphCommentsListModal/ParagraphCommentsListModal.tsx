import { FC, useMemo } from 'react';
import { Paragraph } from '../../types/paragraphs.types';
import Modal, { ModalProps } from '../Modal/Modal';

export interface ParagraphCommentsListModalProps extends ModalProps {
  comments: Paragraph['comments'];
}

const ParagraphCommentsListModal: FC<ParagraphCommentsListModalProps> = ({
  comments,
  ...props
}) => {
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
    [],
  );

  return (
    <Modal {...props}>
      <div className='flex flex-col my-4 space-y-4 text-light-primary'>
        {comments?.map(comment => (
          <div key={comment.id} className='p-4 border rounded-2xl border-stone-100 border-opacity-20'>
            <span className='text-lg font-semibold'>
              {dateFormatter.format(new Date())}, {comment.creatorName} commented:
            </span>
            <p className='text-lg overflow-y-auto max-h-[150px] with-scrollbar'>
              {comment.content}
            </p>
          </div>
        ))}
        {!comments?.length && <span className='text-lg'>No comments have been added yet.</span>}
      </div>
    </Modal>
  );
};

export default ParagraphCommentsListModal;
