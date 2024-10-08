import React, { FC, useEffect, useState } from 'react';
import { Button } from 'components/UI';
import PageHeader from 'components/ProjectDetails/PageHeader';
import { RocketIcon } from 'components/Icons/Icons';
import { useAtom } from 'jotai';
import { editProjectAtom, projectAtom, projectsAtom } from 'storage/project/project.storage'; // Assuming you have this atom to edit project
import AnswerModal from './SimpleAnswerModal';
import { useParams } from 'react-router-dom';
import SkipButton from 'components/Project/SkipButton';
import { Project } from 'types/project.types';

const UserAcquisitionStrategyView: FC<{ onProcess?: (updatedProject: Project) => void, onSkip: () => void }> = ({ onProcess, onSkip }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
    const { id } = useParams();
    const [project, setProject] = useAtom(projectAtom);
    const [projects] = useAtom(projectsAtom);
    const [, editProject] = useAtom(editProjectAtom);
    const [answers, setAnswers] = useState<string[]>(project?.pitchdeck?.userAcquisitonStrategy ? (project?.pitchdeck?.userAcquisitonStrategy) : ['', '', '', '', '']);

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
                userAcquisitonStrategy: answers,
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
                title="User acquisition strategy"
                subtitle="Now you should define how will you attract your customers and transform leads (people who are interested in your product) to buyers"
            />

            <div className="flex items-start space-x-4">
                <ul className="w-full space-y-4">
                    {[
                        "Describe your ideal customer in details",
                        "Describe your SEO (search engine optimization) in details",
                        "Describe your content marketing in details (blogs, landing pages, webinars etc.)",
                        "Describe your e-mail marketing in details",
                        "Describe how could you use your customers’ testimonials in details"
                    ]
                    .map((question, index) => (
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

export default UserAcquisitionStrategyView;
