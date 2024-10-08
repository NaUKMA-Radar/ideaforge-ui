import { useState } from 'react';
import { ProjectStageUrlsEnum } from 'types/enums/project-stage.enum';
import { Link, useLocation } from 'react-router-dom';
import { ApplicationRoutes } from 'utils/app.utils';
import { useParams } from 'react-router';

const ProjectStages = () => {
    const location = useLocation();
    const currentPage = location.pathname.split('/').pop();
    const [stage, setStage] = useState(currentPage);
    const { id } = useParams();

    // Create an array of stages for easier rendering
    const stages = [
        {
            name: 'Idea Validation',
            stageUrl: ProjectStageUrlsEnum.IdeaValidation,
            to: `${ApplicationRoutes.Projects}/${id}${ApplicationRoutes.IdeaValidation}`,
        },
        {
            name: 'Creating your pitch deck',
            stageUrl: ProjectStageUrlsEnum.Pitchdeck,
            to: `${ApplicationRoutes.Projects}/${id}${ApplicationRoutes.CreateYourPitchDeck}`,
        },
        {
            name: 'Creating your executive summary',
            stageUrl: ProjectStageUrlsEnum.ExecutiveSummary,
            to: `${ApplicationRoutes.Projects}/${id}${ApplicationRoutes.ExecutiveSummary}`,
        },
        {
            name: 'Dataroom and metrics development',
            stageUrl: ProjectStageUrlsEnum.DataroomAndMetrics,
            to: `${ApplicationRoutes.Projects}/${id}${ApplicationRoutes.DataroomAndMetrics}`,
        },
        {
            name: 'Business and functional requirements',
            stageUrl: ProjectStageUrlsEnum.BusinessAndFunctionalRequirements,
            to: `${ApplicationRoutes.Projects}/${id}${ApplicationRoutes.BusinessAndFunctionalRequirements}`,
        },
        {
            name: 'Kanban',
            stageUrl: ProjectStageUrlsEnum.Kanban,
            to: `${ApplicationRoutes.Projects}/${id}${ApplicationRoutes.Kanban}`,
        },
    ];
    
    const activeIndex = stages.findIndex(item => item.stageUrl === stage);

    return (
        <div className='fixed flex bg-grey-tertiary backdrop-blur-xl h-full flex-1 z-[100] group/stage items-center py-8 px-4'>
            <div className='flex justify-center flex-1 h-full gap-8'>
                <div className="flex flex-col items-center justify-center">
                    {/* Dynamic stages with gradient lines */}
                    {stages.map((item, index) => (
                        <div key={index} className="flex items-start w-full gap-4">
                            {/* Line and circles */}
                            <div className="flex flex-col items-center">
                                {/* Gradient Circle */}
                                <div className={`w-12 h-12 -my-px rounded-full bg-gradient-to-b from-[#23B8FF] via-[#8F4FFF] to-[#D423F9] ${stage === item.stageUrl ? '' : ''} ${index === activeIndex ? 'w-16 h-16' : 'w-12 h-12 mx-2'}`}></div>
                                {index < stages.length - 1 && (
                                    <div className="w-2 h-24 bg-gradient-to-b from-[#D423F9] via-[#8F4FFF] to-[#23B8FF]">&nbsp;</div>
                                )}
                            </div>

                            {/* Stage Links */}
                            <Link
                                to={item.to}
                                className={`w-0 hidden group-hover/stage:w-auto group-hover/stage:block text-xl font-[600] hover:text-green-primary transition-all duration-300 cursor-pointer ${stage === item.stageUrl ? 'text-green-primary' : 'text-white'} ${index === activeIndex ? 'py-4' : 'py-2.5'}`}
                                onClick={() => setStage(item.stageUrl)}
                            >
                                {item.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectStages;
