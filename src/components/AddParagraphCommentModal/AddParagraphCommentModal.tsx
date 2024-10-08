import { FC, FormEvent, useState } from 'react';
import Modal, { ModalProps } from '../Modal/Modal';
import { Comment } from '../../types/comments.types';
import { useAuth } from '../../hooks/auth.hooks';
import { XMarkIcon } from '../Icons/Icons';
import { useCommentStorage } from '../../hooks/comment.hooks';
import { Paragraph } from '../../types/paragraphs.types';
import { ParagraphEdition } from '../../types/paragraph-editions.types';
import Spinner from '../Spinner/Spinner';
import { Button, TextareaInput } from 'components/UI';

export interface AddCommentModalProps extends ModalProps {
  paragraph: Paragraph;
  paragraphEdition?: ParagraphEdition;
}

export interface AddCommentModalState {
  data: {
    content?: Comment['content'];
  };
  error: any | null;
  isLoading: boolean;
}

const initialState: AddCommentModalState = {
  data: {},
  error: null,
  isLoading: false,
};

const AddCommentModal: FC<AddCommentModalProps> = ({
  paragraph,
  paragraphEdition,
  onProcess,
  ...props
}) => {
  const [state, setState] = useState(initialState);
  const { authenticatedUser } = useAuth();
  const { createComment } = useCommentStorage();

  const validate = (data: AddCommentModalState['data']) => {
    if (!data.content?.trim()) {
      throw new Error('The content of the comment cannot be empty.');
    }

    if (!authenticatedUser) {
      throw new Error('The user is not authenticated to proceed the request.');
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setState(prevState => ({ ...prevState, isLoading: true }));

    try {
      validate(state.data);
      createComment(
        {
          ...state.data,
          creatorId: authenticatedUser!.rateitId,
          creatorName: authenticatedUser!.email,
          paragraphId: paragraph.id,
          content: state.data.content!,
          ...(paragraphEdition && {
            editionId: paragraphEdition.id,
          }),
        },
        {
          onSuccess: data => {
            onProcess?.(data);
            setState(prevState => ({ ...prevState, isLoading: false }));
          },
          onError: error => {
            setState({ ...state, error });
            setState(prevState => ({ ...prevState, isLoading: false }));
          },
        },
      );
    } catch (error: any) {
      setState({ ...state, error: { message: error.message } });
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  return (
    <Modal {...props}>
      <form className='flex flex-col mt-10' onSubmit={handleSubmit}>
        {!state.isLoading && (
          <>
            {state.error?.message && (
              <span className='inline-flex items-center justify-between px-3 py-2 mb-5 text-red-500 border border-red-200 rounded-lg bg-red-50'>
                {state.error?.message}
                <span
                  className='inline-flex p-2 transition-all duration-300 cursor-pointer hover:text-red-600'
                  onClick={() => setState({ ...state, error: null })}
                >
                  <XMarkIcon className='size-3 stroke-[5px]' />
                </span>
              </span>
            )}
            <div className='flex flex-col'>
              <TextareaInput
                defaultValue={state.data.content}
                placeholder='Comment content'
                className='w-full min-h-[110px] resize-none'
                onChange={event =>
                  setState({
                    ...state,
                    data: { ...state.data, content: event.target.value },
                    error: null,
                  })
                }
              />
            </div>
            <div className='flex flex-col items-start mt-5'>
              <Button
                type="submit"
                uppercase={true}
                size="md"
                className="rounded-2xl"
              >
                add a comment
              </Button>
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

export default AddCommentModal;
