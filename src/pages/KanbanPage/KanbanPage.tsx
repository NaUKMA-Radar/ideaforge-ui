import { Badge, Title } from 'components/UI';
import Navbar from 'components/Navbar/Navbar';
import { navbarLinks } from 'utils/app.utils';
import { useAtom } from 'jotai';
import { projectAtom } from 'storage/project/project.storage';

const KanbanPage = () => {
    const [project] = useAtom(projectAtom);
    
    const renderScrollableText = (title: string, texts?: string[]) => (
        <div className="flex flex-col items-center space-y-4 p-4 mb-4 w-full h-[400px] border-gradient-primary rounded-[20px] before:rounded-[20px]">
            <h3 className="text-2xl text-white">{title}</h3>
            {
                texts &&
                texts.map(text => 
                    <Badge className='w-full p-2.5 text-2xl border-0 truncate'>
                        { text }
                    </Badge>
                )
            }
        </div>
    );

    return (
        <>
            <Navbar links={navbarLinks} className='sticky top-0 z-50 flex justify-center w-full' />
            <div className="px-24 py-10 text-white">
                <Title>Yout tasks</Title>

                <div className="grid grid-cols-4 gap-x-4">
                    {renderScrollableText('Backlog', project?.kanban?.backlog)}
                    {renderScrollableText('In progress', project?.kanban?.inProgress)}
                    {renderScrollableText('Testing', project?.kanban?.testing)}
                    {renderScrollableText('Done', project?.kanban?.done)}
                </div>
            </div>
        </>
    );
};

export default KanbanPage;
