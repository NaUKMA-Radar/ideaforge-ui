import { FC, useEffect, useState } from 'react';
import { Button } from 'components/UI';
import PageHeader from 'components/ProjectDetails/PageHeader';
import { RocketIcon } from 'components/Icons/Icons';
import { useAtom } from 'jotai';
import { editProjectAtom, projectAtom, projectsAtom } from 'storage/project/project.storage'; // Assuming you have this atom to edit project
import AnswerModal from './SimpleAnswerModal';
import { useParams } from 'react-router-dom';
import { Project } from 'types/project.types';
import SkipButton from 'components/Project/SkipButton';

const GoToMarketStrategyView: FC<{ onProcess?: (updatedProject: Project) => void, onSkip: () => void }> = ({ onProcess, onSkip }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
    const { id } = useParams();
    const [project, setProject] = useAtom(projectAtom);
    const [projects] = useAtom(projectsAtom);
    const [, editProject] = useAtom(editProjectAtom);
    const [answers, setAnswers] = useState<string[]>(project?.pitchdeck?.goToMarketStrategy ? (project?.pitchdeck?.goToMarketStrategy) : ['', '', '', '', '']);

     // Find and set the project based on the ID from the URL
    useEffect(() => {
        if (id) {
            setProject(structuredClone(projects.find(project => project.id === id) || null));
        }
    }, [id]);

    const handleAnswerClick = (index: number) => {
        setCurrentQuestionIndex(index);
        setModalOpen(true); // Open the modal when "Answer" or "Edit" is clicked
    };

    const handleUpdateAnswer = (newAnswer: string) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            if (currentQuestionIndex !== null) {
                updatedAnswers[currentQuestionIndex] = newAnswer;
            }
            return updatedAnswers;
        });
        setModalOpen(false); // Close the modal after updating the answer
    };

    const usePreviousData = () => {
        // Logic to fetch and apply previous data could go here
        alert('Using previous data...');
    };

    const handleSave = () => {
        const updatedProject = {
            ...project,
            pitchdeck: {
                ...project?.pitchdeck,
                goToMarketStrategy: answers,
            },
        };

        editProject(updatedProject);
        setProject(updatedProject);

        onProcess?.(updatedProject);

        console.log('Saving strategy:', answers);
    };

    return (
        <div className="px-24 py-10 text-white">
            <PageHeader
                title="Go-to-market strategy"
                subtitle="An important step for a start-up development. You need to identify the strategy of how to launch your product to a new market. We’ve got some tips for you, so it would be easier.
                You need to answer to some questions to briefly build your GTM strategy."
            />

            <div className="flex items-start space-x-4">
                <ul className="w-full space-y-4">
                    {[
                        "What is your product? What problem is it trying to solve?",
                        "Describe your ideal customer in details",
                        "Where are you going to sell your product? Describe the markets",
                        "What ways are you going to reach your audience in?",
                        "What is the key message of your product?",
                    ].map((question, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <RocketIcon className="text-green-primary" />
                                <p className="text-2xl">{question}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    className="text-2xl text-white underline"
                                    onClick={() => handleAnswerClick(index)}
                                >
                                    {answers[index] ? "Edit" : "Answer"}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    className="h-[54px] text-white text-2xl underline whitespace-nowrap"
                    onClick={usePreviousData}
                >
                    Use your previous data
                </button>
            </div>

            <div className="mt-8">
                <button
                    className="text-2xl text-white underline"
                    onClick={() => alert('Download my strategy functionality')}
                >
                    Download my strategy
                </button>
            </div>

            <div className="flex mt-10 space-x-10">
                <Button
                    size='md'
                    uppercase={true}
                    className='px-20 rounded-xl'
                    onClick={handleSave}
                >
                    Save
                </Button>
                <button
                    type="button"
                    className="border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-dark-primary rounded-xl px-8 py-3 font-[900] text-lg font-mono transition-all duration-1000"
                    onClick={() => alert('Invite mentor functionality')}
                >
                    Invite mentor to validate
                </button>
                <SkipButton onClick={() => onSkip?.()} />
            </div>

            {/* Answer Modal */}
            {modalOpen && currentQuestionIndex !== null && (
                <AnswerModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    answer={answers[currentQuestionIndex]} // Pass the current answer as default value
                    onUpdate={handleUpdateAnswer} // Pass the updating function
                />
            )}
        </div>
    );
};

export default GoToMarketStrategyView;
