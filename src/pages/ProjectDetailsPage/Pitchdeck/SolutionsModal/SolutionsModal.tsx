import Modal, { ModalProps } from 'components/Modal/Modal';
import SkipButton from 'components/Project/SkipButton';
import { Label } from 'components/UI';
import { useAtom } from 'jotai';
import { FC, FormEvent, useEffect, useState } from 'react';
import { editProjectAtom } from 'storage/project/project.storage';
import { Project } from 'types/project.types';
import { v4 as uuid } from 'uuid';

export interface SolutionsModalProps extends ModalProps {
  project: Project;
  onSkip: () => void;
}

export interface SolutionsModalState {
  data: {
    solutions: string[];
  };
  error: string | null;
}

const initialState: SolutionsModalState = {
  data: {
    solutions: [],
  },
  error: null,
};

const SolutionsModal: FC<SolutionsModalProps> = ({ onProcess, onSkip, project, ...props }) => {
  const [state, setState] = useState(initialState);
  const [, editProject] = useAtom(editProjectAtom);

  const validate = (data: SolutionsModalState['data']) => {
    if (!data.solutions.length || data.solutions.find(solution => !solution.trim())) {
      throw new Error('No solutions were provided or some of them have empty values');
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
          solutions: JSON.stringify(state.data.solutions),
        },
      };

      editProject(updatedProject);

      onProcess?.(updatedProject);
    } catch (error: any) {
      setState({ ...state, error: error.message });
    }
  };

  useEffect(() => {
    if (project.pitchdeck?.solutions) {
      setState({
        ...state,
        data: { ...state.data, solutions: JSON.parse(project.pitchdeck.solutions) },
      });
    }

    if (project.pitchdeck?.problems) {
      if (
        JSON.parse(project.pitchdeck?.problems  || '[]').length !==
        JSON.parse(project.pitchdeck?.solutions || '[]').length
      ) {
        setState({
          ...state,
          data: {
            ...state.data,
            solutions: Array.from({ length: JSON.parse(project.pitchdeck.problems).length }).map(
              _ => '',
            ),
          },
        });
      }
    }
  }, [project]);

  return (
    <Modal
      title={project.pitchdeck?.problems ? 'Please enter some solutions that your product offers:' : 'Please, add problems first.'}
      titleClassName='!text-2xl font-normal font-sans !px-24'
      {...props}
    >
      {
        project.pitchdeck?.problems ?
        <form onSubmit={handleSubmit}>
          {state.error && (
            <span className='inline-flex px-3 py-2 w-full border border-red-500 rounded-xl text-red-500 font-[600] my-5'>
              {state.error}
            </span>
          )}
          <div className='flex flex-col items-start gap-5 my-5'>
            {JSON.parse(project.pitchdeck?.problems || '[]').map((problem: string, index: number) => (
              <div className='flex flex-col w-full' key={index}>
                <Label
                  htmlFor={`pitchdeck_problem_${index}`}
                  className='text-white !text-xl'
                >
                  Problem {index + 1}:
                </Label>
                <p className='my-2 text-lg italic text-white'>{problem}</p>
                <div className='flex'>
                  <textarea
                    value={state.data.solutions[index]}
                    id={`pitchdeck_solution_${index}`}
                    placeholder='Solution to the provided problem'
                    className='inline-flex flex-1 p-3 rounded-xl border-2 border-green-primary outline-none bg-transparent text-white font-[600] text-lg mt-1 min-h-[150px] resize-none'
                    onChange={event =>
                      setState({
                        ...state,
                        data: {
                          ...state.data,
                          solutions: state.data.solutions.map((s, i) =>
                            i === index ? event.target.value : s,
                          ),
                        },
                        error: null,
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className='grid grid-cols-[1fr_4fr_1fr] gap-5'>
            <button
              type='submit'
              className='w-full text-white bg-primary-gradient bg-[length:200%_200%] bg-[0%_0%] enabled:hover:bg-[100%_100%] rounded-lg px-10 py-3 font-[900] text-lg font-mono transition-all duration-1000 disabled:opacity-20'
            >
              Save
            </button>
            <button
              type='button'
              className='w-full border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-dark-primary rounded-lg px-10 py-3 font-[900] text-lg font-mono transition-all duration-1000'
            >
              Invite mentor to validate
              </button>
            <SkipButton onClick={() => onSkip?.()} />
          </div>
          </form>
          :
          <SkipButton className='my-5' onClick={() => onSkip?.()} />
      }
    </Modal>
  );
};

export default SolutionsModal;
