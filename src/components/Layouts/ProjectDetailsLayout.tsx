import StagesNavigation from 'components/Project/StagesNavigation';

const ProjectDetailsLayout = ({ children }) => {
    return (
        <div className="flex">
            <StagesNavigation />
            <div className='w-full h-screen pl-32'>{children}</div>
        </div>
    );
};

export default ProjectDetailsLayout;
