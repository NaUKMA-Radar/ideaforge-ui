import { useAtom } from 'jotai';
import { FC, useState } from 'react';
import { editProjectAtom, projectAtom } from 'storage/project/project.storage';
import { Project } from 'types/project.types';
import PageHeader from 'components/ProjectDetails/PageHeader';
import { Button } from 'components/UI';
import { Link } from 'react-router-dom';
import { PlusIcon } from 'components/Icons/Icons';
import CompetitorFormModal from './CompetitorModal';
import { createPortal } from 'react-dom';
import SkipButton from 'components/Project/SkipButton';

interface Competitor {
    companyName: string;
    stageOfEngagement: string;
    comprehensiveSupport: string;
    fundingMechanism: string;
    communityEngagement: string;
}

const CompetitorsAnalysisView: FC<{ onProcess?: (updatedProject: Project) => void, onSkip: () => void }> = ({ onProcess, onSkip }) => {
    const [, editProject] = useAtom(editProjectAtom);
    const [project, setProject] = useAtom(projectAtom);

    const [isCompetitorFormModalVisible, setIsCompetitorFormModalVisible] = useState(false);
    const [competitors, setCompetitors] = useState<Competitor[]>(project?.pitchdeck?.competitors || []);

    const validate = (data: Competitor[]) => {
        if (!data.length) {
            throw new Error('The competitors list must not be empty');
        }
    };

    const handleModalFormSubmit = (newCompetitor: Competitor) => {
        setCompetitors((prev) => [...prev, newCompetitor]);
        setIsCompetitorFormModalVisible(false);
    };

    const handleSave = () => {
        try {
            validate(competitors);

            const updatedProject = {
                ...project,
                pitchdeck: {
                    ...project?.pitchdeck,
                    competitors: competitors, // Save the updated competitors array
                },
            };

            console.log('updatedProject', updatedProject);
            editProject(updatedProject);
            setProject(updatedProject);

            onProcess?.(updatedProject);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <>
            {isCompetitorFormModalVisible &&
                createPortal(
                    <CompetitorFormModal
                        title="Competitor"
                        onProcess={handleModalFormSubmit}
                        onClose={() => setIsCompetitorFormModalVisible(false)}
                    />,
                    document.querySelector('body')!,
                )}

            <form className="px-24" onSubmit={(e) => e.preventDefault()}>
                <PageHeader
                    title="Competitors"
                    subtitle="Here you can compose a neat and convenient table with all of your competitors to show it in your presentation. Just fill in the information needed - and we’ll do the rest for you!"
                />

                <div className="flex mb-4 space-x-8">
                    <button
                        type="button"
                        className="flex items-center px-4 py-3 mr-8 space-x-4 text-white rounded-2xl bg-gradient-white-purple"
                        onClick={() => setIsCompetitorFormModalVisible(true)}
                    >
                        <PlusIcon className="size-8" />
                        <span className="text-2xl">Add a competitor</span>
                    </button>

                    <Button
                        type="button"
                        uppercase={true}
                        size="md"
                        className="px-20 rounded-2xl"
                        onClick={handleSave} // Save project with competitors
                    >
                        Save
                    </Button>

                    <button
                        type="button"
                        className="border-2 border-green-primary text-green-primary uppercase hover:bg-green-primary hover:text-dark-primary rounded-2xl px-4 py-3 font-[900] text-lg font-mono transition-all duration-1000"
                    >
                        Invite mentor to validate
                    </button>
                    <SkipButton onClick={() => onSkip?.()} />
                </div>

                <div className="mt-8">
                    <Link to="/images/logo.png" target="_blank" download className="text-2xl text-white underline">
                        Download my table
                    </Link>
                </div>

                {/* Display Competitors */}
                <div className="mt-10 space-y-6">
                    <h3 className="text-xl font-semibold text-white">Current Competitors:</h3>
                    {competitors.length > 0 ? (
                        <ul className="space-y-4">
                            {competitors.map((competitor, index) => (
                                // <p className='text-white'>{ JSON.stringify(competitor) }</p>
                                <li key={index} className="p-4 text-white border border-gray-700 rounded-lg">
                                    <strong>{competitor.companyName}</strong>
                                    <p>Stage of Engagement: {competitor.stageOfEngagement}</p>
                                    <p>Comprehensive Support: {competitor.comprehensiveSupport}</p>
                                    <p>Funding Mechanism: {competitor.fundingMechanism}</p>
                                    <p>Community Engagement: {competitor.communityEngagement}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No competitors added yet.</p>
                    )}
                </div>
            </form>
        </>
    );
};

export default CompetitorsAnalysisView;
