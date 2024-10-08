import Modal, { ModalProps } from 'components/Modal/Modal';
import { Badge, Button, TextInput } from 'components/UI';
import { useAtom } from 'jotai';
import { FC, FormEvent, useEffect, useState } from 'react';
import { editProjectAtom, projectAtom } from 'storage/project/project.storage';

export interface IncomeModalProps extends ModalProps {}

export interface IncomeModalState {
    data: {
        income: { [key: number]: number }; // Object with indexes as keys and numbers as values
    };
    error: string | null;
}

const initialState: IncomeModalState = {
    data: {
        income: Array(10).fill(0).reduce((acc, _, index) => {
            acc[index] = 0; // Initialize with 0 for each year
            return acc;
        }, {} as { [key: number]: number }),
    },
    error: null,
};

const IncomeModal: FC<IncomeModalProps> = ({ onProcess, ...props }) => {
    const [state, setState] = useState(initialState);
    const [, editProject] = useAtom(editProjectAtom);
    const [project, setProject] = useAtom(projectAtom);

    const validate = (data: IncomeModalState['data']) => {
        if (Object.values(data.income).some(income => income === 0)) {
            throw new Error('Please provide expected income for all years');
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        try {
            validate(state.data);

            const updatedProject = {
                ...project,
                pitchdeck: {
                    ...project?.pitchdeck,
                    expectedIncome: JSON.stringify(state.data.income),
                },
            };

            editProject(updatedProject);
            setProject(updatedProject);

            console.log('updatedProject', updatedProject);


            onProcess?.(updatedProject);
        } catch (error: any) {
            setState({ ...state, error: error.message });
        }
    };

    useEffect(() => {
        if (project.pitchdeck?.expectedIncome) {
            const parsedIncome = JSON.parse(project.pitchdeck.expectedIncome);
            setState({
                ...state,
                data: { ...state.data, income: parsedIncome },
            });
        }
    }, [project]);

    return (
        <Modal
            title="Your expected income"
            titleClassName="!text-2xl font-normal font-sans !px-24"
            className="md:max-w-[629px] max-h-[98%]"
            {...props}
        >
            <form onSubmit={handleSubmit}>
                {state.error && (
                    <span className="inline-flex px-3 py-2 w-full border border-red-500 rounded-xl text-red-500 font-[600] my-5">
                        {state.error}
                    </span>
                )}

                <div className="grid grid-cols-1 my-5 gap-y-5">
                    {Object.entries(state.data.income).map(([year, income], index) => (
                        <div key={index} className="grid grid-cols-2 gap-x-8">
                            <Badge className="!text-2xl w-full py-1">
                                Year {parseInt(year) + 1}
                            </Badge>
                            <TextInput
                                defaultValue={income}
                                id={`expected_income_year_${index}`}
                                type="number"
                                className="px-3 outline-none bg-transparent text-white font-[600] text-lg"
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        data: {
                                            ...state.data,
                                            income: {
                                                ...state.data.income,
                                                [index]: parseInt(event.target.value) || 0, // Ensure value is stored as a number
                                            },
                                        },
                                        error: null,
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-[1fr_2fr] gap-5">
                    <Button type="submit" className="rounded-2xl">
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default IncomeModal;
