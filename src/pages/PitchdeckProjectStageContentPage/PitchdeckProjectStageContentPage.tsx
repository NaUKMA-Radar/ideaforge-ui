import { createPortal } from 'react-dom';
import { useAtom } from 'jotai';
import { FC, useEffect, useState } from 'react';
import { projectAtom, projectsAtom } from 'storage/project/project.storage';
import { ProjectStageEnum } from 'types/enums/project-stage.enum';
import ProblemsModal from '../ProjectDetailsPage/Pitchdeck/ProblemsModal/ProblemsModal';
import SolutionsModal from '../ProjectDetailsPage/Pitchdeck/SolutionsModal/SolutionsModal';
import Navbar from 'components/Navbar/Navbar';
import { navbarLinks } from 'utils/app.utils';
import { useParams, useSearchParams } from 'react-router-dom';
import InitialView from 'pages/ProjectDetailsPage/Pitchdeck/InitialView';
import ProductView from 'pages/ProjectDetailsPage/Pitchdeck/ProductView';
import IdeaValidationView from 'pages/ProjectDetailsPage/Pitchdeck/IdeaValidationView';
import FinancialsAndFundraisingView from 'pages/ProjectDetailsPage/Pitchdeck/FinancialsAndFundraisingView';
import RoadmapView from 'pages/ProjectDetailsPage/Pitchdeck/RoadmapView';
import TractionView from 'pages/ProjectDetailsPage/Pitchdeck/TractionView';
import TeamView from 'pages/ProjectDetailsPage/Pitchdeck/TeamView';
import BusinessModelPage from 'pages/ProjectDetailsPage/Pitchdeck/BusinessModelView/BusinessModelPage';
import CompetitorsAnalysisPage from 'pages/ProjectDetailsPage/Pitchdeck/CompetitorsAnalysisView/CompetitorsAnalysisPage';
import GoToMarketStrategyView from 'pages/ProjectDetailsPage/Pitchdeck/GoToMarketStrategyView';
import UserAcquisitionStrategyView from 'pages/ProjectDetailsPage/Pitchdeck/UserAcquisitionStrategyView';
import { PitchDeckStageParam } from 'types/enums/pitch-deck-stage-param.enum';

const PitchdeckProjectStageContent: FC<{ setStage?: (stage: ProjectStageEnum) => void }> = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams(); // Extract query params

  const [project, setProject] = useAtom(projectAtom);
  const [projects] = useAtom(projectsAtom);

  // Extract the 'stage' param from the query string (in kebab-case)
  const stageParam = searchParams.get('stage');

  // Initial states depending on the `stage` query param value using the enum
  const [isProblemsModalVisible, setIsProblemsModalVisible] = useState(stageParam === PitchDeckStageParam.Problems);
  const [isSolutionsModalVisible, setIsSolutionsModalVisible] = useState(stageParam === PitchDeckStageParam.Solutions);
  const [isProductViewVisible, setIsProductViewVisible] = useState(stageParam === PitchDeckStageParam.Product);
  const [isIdeaValidationViewVisible, setIsIdeaValidationViewVisible] = useState(stageParam === PitchDeckStageParam.IdeaValidation);
  const [isCompetitorsAnalysisViewVisible, setIsCompetitorsAnalysisViewVisible] = useState(stageParam === PitchDeckStageParam.CompetitorsAnalysis);
  const [isBusinessModelViewVisible, setIsBusinessModelViewVisible] = useState(stageParam === PitchDeckStageParam.BusinessModel);
  const [isGoToMarketStrategyViewVisible, setIsGoToMarketStrategyViewVisible] = useState(stageParam === PitchDeckStageParam.GoToMarketStrategy);
  const [isUserAcquisitionStrategyViewVisible, setIsUserAcquisitionStrategyViewVisible] = useState(stageParam === PitchDeckStageParam.UserAcquisitionStrategy);
  const [isFinancialsAndFundraisingViewVisible, setIsFinancialsAndFundraisingViewVisible] = useState(stageParam === PitchDeckStageParam.Financials);
  const [isRoadmapViewVisible, setIsRoadmapViewVisible] = useState(stageParam === PitchDeckStageParam.Roadmap);
  const [isTractionViewVisible, setIsTractionViewVisible] = useState(stageParam === PitchDeckStageParam.Traction);
  const [isTeamViewVisible, setIsTeamViewVisible] = useState(stageParam === PitchDeckStageParam.Team);

  const areAllViewsHidden =
    !isProductViewVisible &&
    !isIdeaValidationViewVisible &&
    !isCompetitorsAnalysisViewVisible &&
    !isBusinessModelViewVisible &&
    !isGoToMarketStrategyViewVisible &&
    !isUserAcquisitionStrategyViewVisible &&
    !isFinancialsAndFundraisingViewVisible &&
    !isRoadmapViewVisible &&
    !isTractionViewVisible &&
    !isTeamViewVisible;

  // Find and set the project based on the ID from the URL
  useEffect(() => {
    if (id) {
      setProject(structuredClone(projects.find(project => project.id === id) || null));
    }
  }, [id]);

  return (
    <div className='flex flex-col w-full h-screen'>
      <Navbar links={navbarLinks} className='sticky top-0 z-50 flex justify-center w-full' />

      <div>
        {/* Problems Modal */}
        {isProblemsModalVisible && project &&
          createPortal(
            <ProblemsModal
              project={project}
              onClose={() => setIsProblemsModalVisible(false)}
              onProcess={project => {
                setIsProblemsModalVisible(false);
                setProject(project);
              }}
              onSkip={() => {
                setIsProblemsModalVisible(false);
                setIsSolutionsModalVisible(true);
                setSearchParams({ stage: 'solutions' });
              }}
              className='max-w-[728px]'
            />,
            document.querySelector('body')!
          )}

        {/* Solutions Modal */}
        {isSolutionsModalVisible && project &&
          createPortal(
            <SolutionsModal
              project={project}
              onClose={() => setIsSolutionsModalVisible(false)}
              onProcess={project => {
                setIsSolutionsModalVisible(false);
                setProject(project);
              }}
              onSkip={() => {
                setIsSolutionsModalVisible(false);
                setIsProductViewVisible(true);
                setSearchParams({ stage: 'product' });
              }}
              className='max-w-[728px]'
            />,
            document.querySelector('body')!
          )}

        {/* Product View */}
        {isProductViewVisible && project &&
          <ProductView
            project={project}
            onProcess={(proj) => {
              setProject(proj);
              setIsProductViewVisible(false);
            }}
            onSkip={() => {
              setIsProductViewVisible(false);
              setIsIdeaValidationViewVisible(true);
              setSearchParams({ stage: 'idea-validation' });
            }}
          />}

        {/* Idea Validation View */}
        {isIdeaValidationViewVisible && project &&
          <IdeaValidationView
            project={project}
            onProcess={(proj) => {
              setProject(proj);
              setIsIdeaValidationViewVisible(false);
            }}
            onSkip={() => {
              setIsIdeaValidationViewVisible(false);
              setIsCompetitorsAnalysisViewVisible(true);
              setSearchParams({ stage: 'competitors-analysis' });
            }}
          />}

        {/* Competitors Analysis View */}
        {isCompetitorsAnalysisViewVisible &&
          <CompetitorsAnalysisPage
            onProcess={() => setIsCompetitorsAnalysisViewVisible(false)}
            onSkip={() => {
              setIsCompetitorsAnalysisViewVisible(false);
              setIsBusinessModelViewVisible(true);
              setSearchParams({ stage: 'business-model' });
            }}
          />}

        {/* Business Model View */}
        {isBusinessModelViewVisible &&
          <BusinessModelPage
            onProcess={() => setIsBusinessModelViewVisible(false)}
            onSkip={() => {
              setIsBusinessModelViewVisible(false);
              setIsGoToMarketStrategyViewVisible(true);
              setSearchParams({ stage: 'go-to-market-strategy' });
            }}
          />}

        {/* Go To Market Strategy View */}
        {isGoToMarketStrategyViewVisible &&
          <GoToMarketStrategyView
            onProcess={() => setIsGoToMarketStrategyViewVisible(false)}
            onSkip={() => {
              setIsGoToMarketStrategyViewVisible(false);
              setIsUserAcquisitionStrategyViewVisible(true);
              setSearchParams({ stage: 'user-acquisition-strategy' });
            }}
          />}

        {/* User Acquisition Strategy View */}
        {isUserAcquisitionStrategyViewVisible &&
          <UserAcquisitionStrategyView
            onProcess={() => setIsUserAcquisitionStrategyViewVisible(false)}
            onSkip={() => {
              setIsUserAcquisitionStrategyViewVisible(false);
              setIsFinancialsAndFundraisingViewVisible(true);
              setSearchParams({ stage: 'financials-and-fundraising' });
            }}
          />}

        {/* Financials and Fundraising View */}
        {isFinancialsAndFundraisingViewVisible &&
          <FinancialsAndFundraisingView
            onProcess={() => setIsFinancialsAndFundraisingViewVisible(false)}
            onSkip={() => {
              setIsFinancialsAndFundraisingViewVisible(false);
              setIsRoadmapViewVisible(true);
              setSearchParams({ stage: 'roadmap' });
            }}
          />}

        {/* Roadmap View */}
        {isRoadmapViewVisible &&
          <RoadmapView
            onProcess={() => setIsRoadmapViewVisible(false)}
            onSkip={() => {
              setIsRoadmapViewVisible(false);
              setIsTractionViewVisible(true);
              setSearchParams({ stage: 'traction' });
            }}
          />}

        {/* Traction View */}
        {isTractionViewVisible &&
          <TractionView
            onProcess={() => setIsTractionViewVisible(false)}
            onSkip={() => {
              setIsTractionViewVisible(false);
              setIsTeamViewVisible(true);
              setSearchParams({ stage: 'team' });
            }}
          />}

        {/* Team View */}
        {isTeamViewVisible &&
          <TeamView
          onProcess={() => setIsTeamViewVisible(false)}
          onSkip={() => {
            setIsTeamViewVisible(false)
          }}
          />}

        {/* Initial View (if no views are visible) */}
        {areAllViewsHidden && (
          <InitialView
            project={project}
            setIsProblemsModalVisible={setIsProblemsModalVisible}
            setIsSolutionsModalVisible={setIsSolutionsModalVisible}
            setIsProductViewVisible={setIsProductViewVisible}
            setIsIdeaValidationViewVisible={setIsIdeaValidationViewVisible}
            setIsCompetitorsAnalysisViewVisible={setIsCompetitorsAnalysisViewVisible}
            setIsBusinessModelViewVisible={setIsBusinessModelViewVisible}
            setIsGoToMarketStrategyViewVisible={setIsGoToMarketStrategyViewVisible}
            setIsUserAcquisitionStrategyViewVisible={setIsUserAcquisitionStrategyViewVisible}
            setIsFinancialsAndFundraisingViewVisible={setIsFinancialsAndFundraisingViewVisible}
            setIsRoadmapViewVisible={setIsRoadmapViewVisible}
            setIsTractionViewVisible={setIsTractionViewVisible}
            setIsTeamViewVisible={setIsTeamViewVisible}
          />
        )}
      </div>
    </div>
  );
};

export default PitchdeckProjectStageContent;
