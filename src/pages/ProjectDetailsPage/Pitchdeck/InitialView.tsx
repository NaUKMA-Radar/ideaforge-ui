import { FC } from 'react';
import { Project } from 'types/project.types';
import { useSearchParams } from 'react-router-dom';
import { PitchDeckStageParam } from 'types/enums/pitch-deck-stage-param.enum';

interface InitialViewProps {
    project: Project | null;
    setIsProblemsModalVisible: (isVisible: boolean) => void;
    setIsSolutionsModalVisible: (isVisible: boolean) => void;
    setIsProductViewVisible: (isVisible: boolean) => void;
    setIsIdeaValidationViewVisible: (isVisible: boolean) => void;
    setIsCompetitorsAnalysisViewVisible: (isVisible: boolean) => void;
    setIsBusinessModelViewVisible: (isVisible: boolean) => void;
    setIsGoToMarketStrategyViewVisible: (isVisible: boolean) => void;
    setIsUserAcquisitionStrategyViewVisible: (isVisible: boolean) => void;
    setIsFinancialsAndFundraisingViewVisible: (isVisible: boolean) => void;
    setIsRoadmapViewVisible: (isVisible: boolean) => void;
    setIsTractionViewVisible: (isVisible: boolean) => void;
    setIsTeamViewVisible: (isVisible: boolean) => void;
}

const InitialView: FC<InitialViewProps> = ({
    project,
    setIsProblemsModalVisible,
    setIsSolutionsModalVisible,
    setIsProductViewVisible,
    setIsIdeaValidationViewVisible,
    setIsCompetitorsAnalysisViewVisible,
    setIsBusinessModelViewVisible,
    setIsGoToMarketStrategyViewVisible,
    setIsUserAcquisitionStrategyViewVisible,
    setIsFinancialsAndFundraisingViewVisible,
    setIsRoadmapViewVisible,
    setIsTractionViewVisible,
    setIsTeamViewVisible,
}) => {
    // React Router's hook to manage query params
    const [, setSearchParams] = useSearchParams();

    // Helper function to set the query param and open the corresponding modal
    const openStage = (stage: PitchDeckStageParam, setIsVisible: (isVisible: boolean) => void) => {
        setSearchParams({ stage }); // Update the query param
        setIsVisible(true); // Open the corresponding modal/view
    };

    return (
        <div className='flex flex-col items-start flex-1 text-white'>
            <h2 className='text-4xl font-mono font-[700] text-green-primary text-center my-10 w-full'>
                Creating your pitch deck
            </h2>
            <div className='flex flex-col items-center justify-center flex-1 w-full'>
                <div className='relative'>
                    <img
                        src='/images/project/pitchdeck_roadmap.png'
                        alt='Pitchdeck roadmap'
                        className='max-w-[1000px]'
                    />
                    <button
                        type='button'
                        className={`absolute font-mono font-[600] text-lg p-3 -top-[14px] left-[60px] bg-dark-primary enabled:hover:text-green-primary transition-all duration-300 disabled:text-grey-primary ${(project?.pitchdeck?.problems || []).length ? 'text-green-primary' : ''}`}
                        onClick={() => openStage(PitchDeckStageParam.Problems, setIsProblemsModalVisible)}
                    >
                        Problem
                    </button>
                    <button
                        disabled={!(project?.pitchdeck?.problems || []).length}
                        type='button'
                        className='absolute font-mono font-[600] text-lg p-3 -top-[14px] left-[253px] bg-dark-primary enabled:hover:text-green-primary transition-all duration-300 disabled:text-grey-primary'
                        onClick={() => openStage(PitchDeckStageParam.Solutions, setIsSolutionsModalVisible)}
                    >
                        Solution
                    </button>
                    <button
                        disabled={!(project?.pitchdeck?.solutions || []).length}
                        type='button'
                        className='absolute font-mono font-[600] text-lg p-3 -top-[14px] left-[448px] bg-dark-primary enabled:hover:text-green-primary transition-all duration-300 disabled:text-grey-primary'
                        onClick={() => openStage(PitchDeckStageParam.Product, setIsProductViewVisible)}
                    >
                        Product
                    </button>
                    <button
                        disabled={!(project?.pitchdeck?.product ? Object.entries(project?.pitchdeck?.product) : []).length}
                        type='button'
                        className='absolute font-mono font-[600] text-lg p-3 -top-[14px] left-[641px] bg-dark-primary enabled:hover:text-green-primary transition-all duration-300 disabled:text-grey-primary'
                        onClick={() => openStage(PitchDeckStageParam.IdeaValidation, setIsIdeaValidationViewVisible)}
                    >
                        Idea validation
                    </button>
                    <button
                        disabled={!(project?.pitchdeck?.businessModel ? Object.entries(project?.pitchdeck?.businessModel) : []).length}
                        type='button'
                        className='absolute font-mono font-[600] text-lg p-3 top-[113px] left-[114px] bg-dark-primary enabled:hover:text-green-primary transition-all duration-300 disabled:text-grey-primary'
                        onClick={() => openStage(PitchDeckStageParam.GoToMarketStrategy, setIsGoToMarketStrategyViewVisible)}
                    >
                        Go to market strategy
                    </button>
                    <button
                        disabled={!(project?.pitchdeck?.competitors || []).length}
                        type='button'
                        className='absolute font-mono font-[600] text-lg p-3 top-[113px] left-[460px] bg-dark-primary enabled:hover:text-green-primary transition-all duration-300 disabled:text-grey-primary'
                        onClick={() => openStage(PitchDeckStageParam.BusinessModel, setIsBusinessModelViewVisible)}
                    >
                        Business model
                    </button>
                    <button
                        disabled={!Object.entries((project?.pitchdeck?.ideaValidation || {})).length}
                        type='button'
                        className='absolute font-mono font-[600] text-lg p-3 top-[113px] left-[737px] bg-dark-primary enabled:hover:text-green-primary transition-all duration-300 disabled:text-grey-primary'
                        onClick={() => openStage(PitchDeckStageParam.CompetitorsAnalysis, setIsCompetitorsAnalysisViewVisible)}
                    >
                        Competitors analysis
                    </button>
                    <button
                        disabled={!(project?.pitchdeck?.goToMarketStrategy || []).length}
                        type='button'
                        className='absolute font-mono font-[600] text-lg p-3 top-[239px] left-[32px] bg-dark-primary enabled:hover:text-green-primary transition-all duration-300 disabled:text-grey-primary'
                        onClick={() => openStage(PitchDeckStageParam.UserAcquisitionStrategy, setIsUserAcquisitionStrategyViewVisible)}
                    >
                        User acquisition strategy
                    </button>
                    <button
                        disabled={!(project?.pitchdeck?.userAcquisitonStrategy || []).length}
                        type='button'
                        className='absolute font-mono font-[600] text-lg p-3 top-[239px] left-[401px] bg-dark-primary enabled:hover:text-green-primary transition-all duration-300 disabled:text-grey-primary'
                        onClick={() => openStage(PitchDeckStageParam.Financials, setIsFinancialsAndFundraisingViewVisible)}
                    >
                        Financials
                    </button>
                    <button
                        disabled={!(project?.pitchdeck?.financialsAndFundraising || []).length}
                        type='button'
                        className='absolute font-mono font-[600] text-lg p-3 top-[239px] left-[615px] bg-dark-primary enabled:hover:text-green-primary transition-all duration-300 disabled:text-grey-primary'
                        onClick={() => openStage(PitchDeckStageParam.Roadmap, setIsRoadmapViewVisible)}
                    >
                        Roadmap
                    </button>
                    <button
                        disabled={!Object.entries((project?.pitchdeck?.roadmap || {})).length}
                        type='button'
                        className='absolute font-mono font-[600] text-lg p-3 top-[239px] left-[820px] bg-dark-primary enabled:hover:text-green-primary transition-all duration-300 disabled:text-grey-primary'
                        onClick={() => openStage(PitchDeckStageParam.Traction, setIsTractionViewVisible)}
                    >
                        Traction
                    </button>
                    <button
                        disabled={!Object.entries((project?.pitchdeck?.traction || {})).length}
                        type='button'
                        className='absolute font-mono font-[600] text-lg p-3 top-[365px] left-[878px] bg-dark-primary enabled:hover:text-green-primary transition-all duration-300 disabled:text-grey-primary'
                        onClick={() => openStage(PitchDeckStageParam.Team, setIsTeamViewVisible)}
                    >
                        Team
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InitialView;
