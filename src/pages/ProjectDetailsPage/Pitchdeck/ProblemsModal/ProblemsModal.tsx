import { RemoveIcon } from 'components/Icons/Icons';
import Modal, { ModalProps } from 'components/Modal/Modal';
import InviteMentorButton from 'components/Project/InviteMentorButton';
import SkipButton from 'components/Project/SkipButton';
import { Label, TextareaInput } from 'components/UI';
import { useAtom } from 'jotai';
import { FC, FormEvent, useEffect, useState } from 'react';
import { editProjectAtom } from 'storage/project/project.storage';
import { Project } from 'types/project.types';
import { v4 as uuid } from 'uuid';

export interface ProblemsModalProps extends ModalProps {
  project: Project;
  onSkip: () => void;
}

export interface ProblemsModalState {
  data: {
    problems: string[];
  };
  error: string | null;
}

const initialState: ProblemsModalState = {
  data: {
    problems: [''],
  },
  error: null,
};

const ProblemsModal: FC<ProblemsModalProps> = ({ onProcess, onSkip, project, ...props }) => {
  const [state, setState] = useState(initialState);
  const [, editProject] = useAtom(editProjectAtom);

  const validate = (data: ProblemsModalState['data']) => {
    if (!data.problems.length || data.problems.find(problem => !problem.trim())) {
      throw new Error('No problems were provided or some of them have empty values');
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    try {
      validate(state.data);

      const updatedProject = {
        ...project,
        pitchdeck: {
          ...(project.pitchdeck || ({ id: uuid() } as any)),
          problems: JSON.stringify(state.data.problems),
        },
      };

      editProject(updatedProject);

      onProcess?.(updatedProject);
    } catch (error: any) {
      setState({ ...state, error: error.message });
    }
  };

  useEffect(() => {
    if (project.pitchdeck?.problems) {
      setState({
        ...state,
        data: { ...state.data, problems: JSON.parse(project.pitchdeck.problems) },
      });
    }
  }, [project]);

  return (
    <Modal
      title='Please enter from 1 to 3 problems that your potential users have:'
      titleClassName='!text-2xl font-normal font-sans !px-24'
      {...props}
    >
      <form onSubmit={handleSubmit}>
        {state.error && (
          <span className='inline-flex px-3 py-2 w-full border border-red-500 rounded-xl text-red-500 font-[600] my-5'>
            {state.error}
          </span>
        )}
        <div className='flex flex-col items-start gap-5 my-5'>
          {state.data.problems.map((problem, index) => (
            <div className='flex flex-col w-full' key={index}>
              <Label
                htmlFor={`pitchdeck_problem_${index}`}
                className='text-white !text-xl'
              >
                Problem {index + 1}
              </Label>
              <div className='flex'>
                <TextareaInput
                  id={`pitchdeck_problem_${index}`}
                  defaultValue={problem}
                  placeholder='Problem description'
                  className='inline-flex flex-1 mt-1'
                  inputClassName='!bg-transparent min-h-[150px]'
                  // className='p-3 rounded-xl border-2 border-green-primary outline-none  text-white font-[600] text-lg  resize-none'
                  onChange={event =>
                    setState({
                      ...state,
                      data: {
                        ...state.data,
                        problems: state.data.problems.map((p, i) =>
                          i === index ? event.target.value : p,
                        ),
                      },
                      error: null,
                    })
                  }
                />
                <RemoveIcon
                  className='mx-2 my-auto text-red-500 cursor-pointer size-6'
                  onClick={() =>
                    setState({
                      ...state,
                      data: {
                        ...state.data,
                        problems: state.data.problems.filter((_, i) => i !== index),
                      },
                      error: null,
                    })
                  }
                />
              </div>
            </div>
          ))}
          <button
            disabled={state.data.problems.length > 2}
            type='button'
            className='text-white bg-primary-gradient bg-[length:200%_200%] bg-[0%_0%] hover:bg-[100%_100%] rounded-lg px-8 py-2 font-[900] text-xs font-mono transition-all duration-1000 disabled:opacity-20'
            onClick={() =>
              setState({
                ...state,
                data: {
                  ...state.data,
                  problems: [...state.data.problems, ''],
                },
                error: null,
              })
            }
          >
            Add problem
          </button>
        </div>
        <div className='grid grid-cols-[1fr_2fr] gap-5'>
          <button
            type='submit'
            className='w-full text-white bg-primary-gradient bg-[length:200%_200%] bg-[0%_0%] enabled:hover:bg-[100%_100%] rounded-lg px-10 py-3 font-[900] text-lg font-mono transition-all duration-1000 disabled:opacity-20'
          >
            Save
          </button>
          {/* <button
            type='button'
            className='w-full border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-dark-primary rounded-lg px-10 py-3 font-[900] text-lg font-mono transition-all duration-1000'
          >
            Invite mentor to validate
          </button> */}
          <InviteMentorButton inviteToId={project.id} />
          <SkipButton onClick={() => onSkip?.()} />
        </div>
      </form>
    </Modal>
  );
};

export default ProblemsModal;
