import { RocketIcon } from 'components/Icons/Icons';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ProjectStageEnum } from 'types/enums/project-stage.enum';
import { ApplicationRoutes } from 'utils/app.utils';
import { useParams } from 'react-router';


const InitialProjectStageContent: FC<{ setStage?: (stage: ProjectStageEnum) => void }> = ({
    setStage,
  }) => {
    const { id } = useParams()
  
    return (
      <div className='flex flex-col items-start px-32 text-white'>
        <h2 className='text-4xl font-mono font-[700] text-center my-10 w-full'>
          Congratulations, [Name]!
        </h2>
        <p className='mt-10 text-3xl'>You've successfully created your first project.</p>
        <p className='mt-5 text-3xl'>
          Now, let's move forward. You'll be guided throughout all of the steps needed for successful
          launch of your product
        </p>
        <Link
          to={`${ApplicationRoutes.Projects}/${id}${ApplicationRoutes.CreateYourPitchDeck}`}
          className='inline-flex gap-2 items-center uppercase text-white bg-primary-gradient bg-[length:200%_200%] bg-[0%_0%] hover:bg-[100%_100%] rounded-3xl px-20 py-7 font-[900] text-3xl font-mono mt-16 transition-all duration-1000'
          onClick={() => { setStage?.(ProjectStageEnum.Pitchdeck) }}
        >
          Let's start
          <RocketIcon className='size-12' />
        </Link>
      </div>
    );
};

export default InitialProjectStageContent;