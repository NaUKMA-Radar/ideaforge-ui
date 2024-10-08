import { RemoveIcon } from 'components/Icons/Icons';
import Modal, { ModalProps } from 'components/Modal/Modal';
import { Avatar, Button, CheckboxInput, Label, SelectInput, TextInput, TextareaInput } from 'components/UI';
import { useAtom } from 'jotai';
import { FC, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProjectAtom } from 'storage/project/project.storage';
import { SocialMediaEnum } from 'types/enums/social-media.enum';
import { UserToProjectRoleEnum } from 'types/enums/user-to-project-role.enum';
import { CreateProjectMemberDto } from 'types/project.types';
import { ApplicationRoutes } from 'utils/app.utils';
import { v4 as uuid } from 'uuid';

export interface CreateProjectModalProps extends ModalProps {}

export interface CreateProjectModalState {
  data: {
    name?: string;
    url?: string;
    description?: string;
    team?: CreateProjectMemberDto[];
    socialMediaLinks?: {
      socialMediaName: SocialMediaEnum;
      url: string;
    }[];
  };
  selectedImage?: File | null;
  areTermsAndConditionsAccepted: boolean;
  error: string | null;
}

const initialState: CreateProjectModalState = {
  data: {},
  areTermsAndConditionsAccepted: false,
  error: null,
};

const CreateProjectModal: FC<CreateProjectModalProps> = ({ onProcess, ...props }) => {
  const [state, setState] = useState(initialState);
  const [, addProject] = useAtom(addProjectAtom);
  const modalContentRef = useRef(null);
  const navigate = useNavigate();

  const validate = (data: CreateProjectModalState['data']) => {
    if (!data.name?.trim()) {
      throw new Error('The project name cannot be empty');
    }

    if (!data.url?.trim()) {
      throw new Error('The project url cannot be empty');
    }

    if (!data.description?.trim()) {
      throw new Error('The project description cannot be empty');
    }

    if (
      !data.socialMediaLinks ||
      data.socialMediaLinks.find(link => !link.url.trim() || !link.socialMediaName)
    ) {
      throw new Error('Social media links were not provided or some of them contain empty values');
    }

    if (!data.team || data.team.find(member => !member.email.trim() || !member.role)) {
      throw new Error('Team members were not provided or some of them contain empty values');
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    try {
      validate(state.data);
      const project = {
        name: state.data.name!,
        url: state.data.url!,
        socialMediaLinks: JSON.stringify(state.data.socialMediaLinks!),
        description: state.data.description!,
        userToProjects: state.data.team!.map(({ isMentor, email, role }) => ({
          isMentor,
          role,
          invitedAt: new Date(),
          user: { email } as any,
          project: {} as any,
          userId: uuid(),
          projectId: uuid(),
        })),
        id: uuid(),
        image: null,
        createdAt: new Date(),
        updatedAt: null,
        authorId: uuid(),
        pitchdeckId: null,
        executiveSummaryId: null,
        dataroomAndMetricsId: null,
        businessAndFunctionalRequirementsId: null,
        author: {} as any,
        tasks: [],
        pitchdeck: null,
        executiveSummary: null,
        dataroomAndMetrics: null,
        businessAndFunctionalRequirements: null,
      };

      addProject(project);

      onProcess?.();
      navigate(ApplicationRoutes.ProjectDetails.replace(':id', project.id));
    } catch (error: any) {
      setState({ ...state, error: error.message });

      if (modalContentRef.current) {
        (modalContentRef.current as HTMLElement)
          .closest('.modal-content')
          ?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <Modal {...props} className='max-w-[728px]'>
      <form className='mt-10 text-white' onSubmit={handleSubmit} ref={modalContentRef}>
        {state.error && (
          <span className='inline-flex px-3 py-2 w-full border border-red-500 rounded-xl text-red-500 font-[600] my-5'>
            {state.error}
          </span>
        )}
        <div className='flex gap-5'>
          <div className='flex items-center'>
            <Avatar />
          </div>
          <div className='flex flex-col flex-1 gap-5'>
            <div className='flex flex-col'>
              <Label htmlFor='create_project_name'>
                Name
              </Label>
              <TextInput
                defaultValue={state.data.name}
                id='create_project_name'
                placeholder='New project'
                onChange={event =>
                  setState({
                    ...state,
                    data: { ...state.data, name: event.target.value || undefined },
                  })
                }
              />
            </div>
            <div className='flex flex-col'>
              <Label htmlFor='create_project_url'>
                URL
              </Label>
              <TextInput
                defaultValue={state.data.url}
                id='create_project_url'
                placeholder='https://project.com'

                onChange={event =>
                  setState({
                    ...state,
                    data: { ...state.data, url: event.target.value || undefined },
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-5 mt-5'>
          <div className='flex flex-col'>
            <Label htmlFor='create_project_description'>
              Description
            </Label>
            <TextareaInput
              id='create_project_description'
              defaultValue={state.data.description}
              placeholder='Project description'
              className='font-[600] text-lg mt-1 min-h-[150px] resize-none'
              onChange={event =>
                setState({
                  ...state,
                  data: { ...state.data, description: event.target.value || undefined },
                })
              }
            />
          </div>
          <div className='flex flex-col'>
            <Label htmlFor='create_project_social_media_links'>
              Social media links
            </Label>
            <div className='flex flex-col items-start gap-2' id='create_project_social_media_links'>
              {state.data.socialMediaLinks?.map((link, index) => (
                <div key={index} className='grid grid-cols-[1fr_2fr] w-full gap-2'>
                  <SelectInput
                    value={link.socialMediaName}
                    className='outline-none font-[600] text-lg'
                    onChange={event =>
                      setState({
                        ...state,
                        data: {
                          ...state.data,
                          socialMediaLinks: state.data.socialMediaLinks?.map((l, i) =>
                            i === index
                              ? { ...l, socialMediaName: event.target.value as SocialMediaEnum }
                              : l,
                          ),
                        },
                      })
                    }
                  >
                    {Object.entries(SocialMediaEnum).map(([key, value], idx) => (
                      <option key={idx} value={value} className='text-dark-primary'>
                        {key}
                      </option>
                    ))}
                  </SelectInput>
                  <div className='flex justify-between'>
                    <TextInput
                      value={link.url}
                      placeholder='https://project.com'
                      className='flex flex-1 outline-none text-white font-[600] text-lg'
                      onChange={event =>
                        setState({
                          ...state,
                          data: {
                            ...state.data,
                            socialMediaLinks: state.data.socialMediaLinks?.map((l, i) =>
                              i === index ? { ...l, url: event.target.value } : l,
                            ),
                          },
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
                            socialMediaLinks: state.data.socialMediaLinks?.filter(
                              (_, i) => i !== index,
                            ),
                          },
                        })
                      }
                    />
                  </div>
                </div>
              ))}
              <Button
                size='sm'
                className='rounded-lg font-[900] mt-2'
                onClick={() =>
                  setState({
                    ...state,
                    data: {
                      ...state.data,
                      socialMediaLinks: [
                        ...(state.data.socialMediaLinks || []),
                        { socialMediaName: SocialMediaEnum.GitHub, url: '' },
                      ],
                    },
                  })
                }
              >
                Add new link
              </Button>
            </div>
          </div>
          <div className='flex flex-col'>
            <Label htmlFor='create_project_team'>
              Members
            </Label>
            <div className='flex flex-col items-start gap-2' id='create_project_team'>
              {state.data.team?.map((member, index) => (
                <div key={index} className='flex w-full gap-2'>
                  <TextInput
                    value={member.email}
                    type='email'
                    placeholder='example@gmail.com'
                    className='flex flex-1 outline-none text-white font-[600] text-lg'
                    onChange={event =>
                      setState({
                        ...state,
                        data: {
                          ...state.data,
                          team: state.data.team?.map((l, i) =>
                            i === index ? { ...l, email: event.target.value } : l,
                          ),
                        },
                      })
                    }
                  />
                  <SelectInput
                    value={member.role}
                    className='outline-none font-[600] text-lg'
                    onChange={event =>
                      setState({
                        ...state,
                        data: {
                          ...state.data,
                          team: state.data.team?.map((m, i) =>
                            i === index
                              ? { ...m, role: event.target.value as UserToProjectRoleEnum }
                              : m,
                          ),
                        },
                      })
                    }
                  >
                    {Object.entries(UserToProjectRoleEnum).map(([key, value], idx) => (
                      <option key={idx} value={value} className='text-dark-primary'>
                        {key}
                      </option>
                    ))}
                  </SelectInput>
                  <div className='flex items-center'>
                    <CheckboxInput
                      id={`create_project_team_${index}_is_mentor`}
                      checked={member.isMentor}
                      onChange={event =>
                        setState({
                          ...state,
                          data: {
                            ...state.data,
                            team: state.data.team?.map((m, i) =>
                              i === index ? { ...m, isMentor: event.target.checked || false } : m,
                            ),
                          },
                        })
                      }
                    />
                    <Label
                      htmlFor={`create_project_team_${index}_is_mentor`}
                      className='cursor-pointer text-nowrap'
                    >
                      Is mentor
                    </Label>
                    <RemoveIcon
                      className='mx-2 my-auto text-red-500 cursor-pointer size-6'
                      onClick={() =>
                        setState({
                          ...state,
                          data: {
                            ...state.data,
                            team: state.data.team?.filter((_, i) => i !== index),
                          },
                        })
                      }
                    />
                  </div>
                </div>
              ))}
              <Button
                size='sm'
                className='rounded-lg font-[900] mt-2'
                onClick={() =>
                  setState({
                    ...state,
                    data: {
                      ...state.data,
                      team: [
                        ...(state.data.team || []),
                        { email: '', role: UserToProjectRoleEnum.Viewer, isMentor: false },
                      ],
                    },
                  })
                }
              >
                Add new member
              </Button>
            </div>
          </div>
        </div>
        <div className='flex gap-2 my-10'>
          <CheckboxInput
            id='are_terms_and_conditions_accepted'
            checked={state.areTermsAndConditionsAccepted}
            onChange={event =>
              setState({
                ...state,
                areTermsAndConditionsAccepted: event.target.checked || false,
              })
            }
          />
          <Label
            htmlFor='are_terms_and_conditions_accepted'
            className='cursor-pointer'
          >
            I agree with the{' '}
            <a href='#' className='text-white underline'>
              Terms and Conditions
            </a>
          </Label>
        </div>
        <Button
          disabled={!state.areTermsAndConditionsAccepted}
          type='submit'
          size='full'
          className='enabled:hover:bg-[100%_100%] rounded-lg font-[900] font-mono transition-all duration-1000 disabled:opacity-20'
        >
          Create project
        </Button>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
