import { useEffect, useState } from 'react';
import PageHeader from 'components/ProjectDetails/PageHeader';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { projectAtom, projectsAtom } from 'storage/project/project.storage';
import InviteMentorButton from 'components/Project/InviteMentorButton';

interface Document {
    name: string;
    file: File | null;
}

const DataroomAndMetricsPage = () => {
    const { id } = useParams();
    const [project, setProject] = useAtom(projectAtom);
    const [projects] = useAtom(projectsAtom);
    const [financialDocuments, setFinancialDocuments] = useState<Document>({ name: 'Financial documents', file: null });
    const [taxDocuments, setTaxDocuments] = useState<Document>({ name: 'Tax documents', file: null });
    const [legalDocuments, setLegalDocuments] = useState<Document>({ name: 'Legal documents', file: null });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setDocument: React.Dispatch<React.SetStateAction<Document>>) => {
        const file = e.target.files?.[0] || null;
        setDocument(prev => ({ ...prev, file }));
    };

    useEffect(() => {
        if (id) {
            setProject(structuredClone(projects.find(project => project.id === id) || null));
        }
    }, [id]);

    const renderFileInput = (document: Document, setDocument: React.Dispatch<React.SetStateAction<Document>>) => (
        <div className="flex items-center justify-between my-4">
            <div className='w-3/4 text-2xl'>{document.name}</div>
            <div className="flex items-center justify-between w-full space-x-4 text-lg">
                {
                    document.file ?
                        <span className="px-3 py-2 text-white border border-white bg-grey-primary rounded-xl">{document.file.name}</span>
                        :
                        <span/>
                }
                <label className="text-2xl text-white underline cursor-pointer">
                    Upload
                    <input
                        type="file"
                        hidden
                        onChange={(e) => handleFileChange(e, setDocument)}
                    />
                </label>
            </div>
        </div>
    );

    return (
        <div className="px-24 py-10 text-white">
            <PageHeader
                title='Dataroom and metrics'
                subtitle='This step is designed for you to keep all of the important documents here. Our system is fully secure and your documents are protected from external access.'            
            />

            <div className='px-32'>
                <div className='space-y-16'>
                    {renderFileInput(financialDocuments, setFinancialDocuments)}
                    {renderFileInput(taxDocuments, setTaxDocuments)}
                    {renderFileInput(legalDocuments, setLegalDocuments)}
                </div>

                <div className="mt-16">
                    {
                        project &&
                        <InviteMentorButton inviteToId={project.id} />
                    }
                </div>
            </div>
        </div>
    );
};

export default DataroomAndMetricsPage;
