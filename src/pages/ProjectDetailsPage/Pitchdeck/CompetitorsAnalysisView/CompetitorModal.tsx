import { FC, useState } from 'react';
import Modal, { ModalProps } from 'components/Modal/Modal';
import { Button, Label, TextInput, SelectInput, Avatar } from 'components/UI'; // Assuming you have a SelectInput component for dropdowns
import { v4 as uuid } from 'uuid';

export interface CompetitorFormModalProps extends ModalProps {}

export interface CompetitorFormState {
    data: {
        companyName?: string;
        stageOfEngagement?: string;
        comprehensiveSupport?: string;
        fundingMechanism?: string;
        communityEngagement?: string;
    };
    selectedImage?: File | null;
    error: string | null;
}

const initialState: CompetitorFormState = {
    data: {},
    error: null,
};

const CompetitorFormModal: FC<CompetitorFormModalProps> = ({ onProcess, ...props }) => {
    const [state, setState] = useState(initialState);

    const validate = (data: CompetitorFormState['data']) => {
        if (!data.companyName?.trim()) {
            throw new Error('Company name cannot be empty');
        }
        // Add more validation if needed
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        try {
            validate(state.data);
            const competitor = {
                id: uuid(),
                companyName: state.data.companyName!,
                stageOfEngagement: state.data.stageOfEngagement || '',
                comprehensiveSupport: state.data.comprehensiveSupport || '',
                fundingMechanism: state.data.fundingMechanism || '',
                communityEngagement: state.data.communityEngagement || '',
                image: state.selectedImage ? URL.createObjectURL(state.selectedImage) : null,
                createdAt: new Date(),
                updatedAt: null,
            };

            // Add the competitor object wherever necessary (e.g., store it or call an API)
            console.log('Competitor:', competitor);

            onProcess?.(competitor);
        } catch (error: any) {
            setState({ ...state, error: error.message });
        }
    };

    return (
        <Modal {...props} className="max-w-[728px]">
            <form className="mt-10 text-white" onSubmit={handleSubmit}>
                {state.error && (
                    <span className="inline-flex px-3 py-2 w-full border border-red-500 rounded-xl text-red-500 font-[600] my-5">
                        {state.error}
                    </span>
                )}

                <Avatar />

                <div className="flex gap-5 mt-5">
                    <div className="flex flex-col flex-1 gap-5">
                        <div className="flex gap-5">
                            <div className="flex flex-col flex-1">
                                <Label htmlFor="competitor_company_name">Company Name</Label>
                                <TextInput
                                    id="competitor_company_name"
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            data: { ...state.data, companyName: event.target.value },
                                        })
                                    }
                                />
                            </div>

                            <div className="flex flex-col flex-1">
                                <Label htmlFor="competitor_stage_of_engagement">Stage of Engagement</Label>
                                <SelectInput
                                    id="competitor_stage_of_engagement"
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            data: { ...state.data, stageOfEngagement: event.target.value },
                                        })
                                    }
                                    options={[
                                        { value: 'idea', label: 'IDEA' },
                                        { value: 'idea+', label: 'IDEA+' },
                                        { value: 'poc', label: 'POC' },
                                        { value: 'mvp', label: 'MVP' },
                                        { value: 'mvp+', label: 'MVP+' },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="flex flex-col flex-1">
                                <Label htmlFor="competitor_comprehensive_support">Comprehensive Support</Label>
                                <SelectInput
                                    id="competitor_comprehensive_support"
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            data: { ...state.data, comprehensiveSupport: event.target.value },
                                        })
                                    }
                                    options={[
                                        { value: 'yes', label: 'Yes' },
                                        { value: 'no', label: 'No' },
                                        // Add more options as needed
                                    ]}
                                />
                            </div>

                            <div className="flex flex-col flex-1">
                                <Label htmlFor="competitor_funding_mechanism">Funding Mechanism</Label>
                                <SelectInput
                                    id="competitor_funding_mechanism"
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            data: { ...state.data, fundingMechanism: event.target.value },
                                        })
                                    }
                                    options={[
                                        { value: 'equity', label: 'Equity' },
                                        { value: 'debt', label: 'Debt' },
                                        // Add more options as needed
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <Label htmlFor="competitor_community_engagement">Community Engagement</Label>
                            <SelectInput
                                id="competitor_community_engagement"
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        data: { ...state.data, communityEngagement: event.target.value },
                                    })
                                }
                                options={[
                                    { value: 'high', label: 'High' },
                                    { value: 'medium', label: 'Medium' },
                                    { value: 'low', label: 'Low' },
                                    // Add more options as needed
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    size="md"
                    className="mt-5 rounded-lg font-[900] font-mono transition-all duration-1000"
                >
                    save
                </Button>
            </form>
        </Modal>
    );
};

export default CompetitorFormModal;
