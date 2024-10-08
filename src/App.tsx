import { FC } from 'react';
import 'App.css';
import 'styles/tinymce.css';
import HomePage from 'pages/HomePage/HomePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ApplicationRoutes } from 'utils/app.utils';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUpPage from 'pages/SignUpPage/SignUpPage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import ProjectDetailsPage from 'pages/ProjectDetailsPage/ProjectDetailsPage';
import PitchdeckProjectStageContent from 'pages/PitchdeckProjectStageContentPage/PitchdeckProjectStageContentPage';
import ProjectDetailsLayout from 'components/Layouts/ProjectDetailsLayout';
import InitialProjectStageContent from 'pages/InitialProjectStageContentPage/InitialProjectStageContentPage';
import ExecutiveSummaryPage from 'pages/ExecutiveSummaryPage/ExecutiveSummaryPage';
import DataroomAndMetricsPage from 'pages/DataroomAndMetricsPage/DataroomAndMetricsPage';
import BusinessAndFunctionalRequirementsPage from 'pages/BusinessAndFunctionalRequirementsPage/BusinessAndFunctionalRequirementsPage';
import KanbanPage from 'pages/KanbanPage/KanbanPage';
import ProjectsPage from 'pages/ProjectsPage/ProjectsPage';
import IdeaValidationPage from 'pages/IdeaValidationPage/IdeaValidationPage';
import DocumentDetailsPage from 'pages/DocumentDetailsPage/DocumentDetailsPage';
import HeaderLayout from 'components/Layouts/HeaderLayout';
import SignInPage from 'pages/SigninPage/SigninPage';

const App: FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer transition={Slide} theme="dark" />
      <Routes>
        <Route path={ApplicationRoutes.Root} element={<Navigate to={ApplicationRoutes.Home} />} />
        <Route index path={ApplicationRoutes.Home} Component={HomePage} />
        <Route path={ApplicationRoutes.SignUp} Component={SignUpPage} />
        <Route path={ApplicationRoutes.SignIn} Component={SignInPage} />

        <Route
          path={`${ApplicationRoutes.ProjectDetails}${ApplicationRoutes.Kanban}`}
          element={
            <ProjectDetailsLayout>
              <KanbanPage />
            </ProjectDetailsLayout>
          }
        />
        <Route
          path={`${ApplicationRoutes.ProjectDetails}${ApplicationRoutes.BusinessAndFunctionalRequirements}`}
          element={
            <ProjectDetailsLayout>
              <BusinessAndFunctionalRequirementsPage />
            </ProjectDetailsLayout>
          }
        />
        <Route
          path={`${ApplicationRoutes.ProjectDetails}${ApplicationRoutes.DataroomAndMetrics}`}
          element={
            <ProjectDetailsLayout>
              <DataroomAndMetricsPage />
            </ProjectDetailsLayout>
          }
        />
        <Route
          path={`${ApplicationRoutes.ProjectDetails}${ApplicationRoutes.ExecutiveSummary}`}
          element={
            <ProjectDetailsLayout>
              <ExecutiveSummaryPage />
            </ProjectDetailsLayout>
          }
        />
        <Route
          path={`${ApplicationRoutes.ProjectDetails}${ApplicationRoutes.CreateYourPitchDeck}`}
          element={
            <ProjectDetailsLayout>
              <PitchdeckProjectStageContent />
            </ProjectDetailsLayout>
          }
        />
        <Route
          path={`${ApplicationRoutes.ProjectDetails}${ApplicationRoutes.Start}`}
          element={
            <ProjectDetailsLayout>
              <InitialProjectStageContent />
            </ProjectDetailsLayout>
          }
        />
        <Route path={ApplicationRoutes.ProjectDetails}
          element={
            <ProjectDetailsLayout>
              <ProjectDetailsPage />
            </ProjectDetailsLayout>
        } />
        <Route path={ApplicationRoutes.Projects} Component={ProjectsPage}/>
        <Route path={ApplicationRoutes.Profile} Component={ProfilePage} />
        <Route
          path={`${ApplicationRoutes.ProjectDetails}${ApplicationRoutes.IdeaValidation}`}
          element={
            <ProjectDetailsLayout>
              <IdeaValidationPage />
            </ProjectDetailsLayout>
          }
        />
        <Route path={ApplicationRoutes.DocumentDetails}
          element={
            <HeaderLayout>
              <DocumentDetailsPage />
            </HeaderLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
