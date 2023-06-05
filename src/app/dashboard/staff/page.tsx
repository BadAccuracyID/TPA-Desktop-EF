'use client'

import LeftNavBar from "@/components/card/LeftNavBar";
import {useEffect, useState} from "react";
import {getAllAccounts} from "@/components/datastore/local/UserManager";
import {Account} from "@/components/objects/Account";
import Loading from "@/components/card/Loading";
import {StaffCard, StaffSettingsModel} from "@/components/card/staff/StaffCard";
import {AccountRole} from "@/components/objects/AccountRole";
import {AccountShift} from "@/components/objects/AccountShift";

interface Category {
    name: string;
    accounts: Account[];
    predicate: (account: Account) => boolean;
}

const ActualPage = ({data, doRefetch}: {
    data: Account[];
    doRefetch: () => void;
}) => {
    const [categories, setCategories] = useState<Category[]>([
        {
            name: 'Verified',
            accounts: [],
            predicate: (account) => account.isVerified()
        },
        {
            name: 'Unverified',
            accounts: [],
            predicate: (account) => !account.isVerified()
        }
    ]);

    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [refresh, setRefresh] = useState(false);

    const [selectedView, setSelectedView] = useState<'status' | 'role' | 'shift'>('status');

    const handleCloseModal = () => {
        setSelectedAccount(null);
    };

    const handleDoRefresh = () => {
        setRefresh(!refresh);
    }

    const handleDoRefetch = () => {
        doRefetch();
    }

    const changeView = (view: 'status' | 'role' | 'shift') => {
        setSelectedView(view);

        if (view === 'status') {
            setCategories([
                {
                    name: 'Verified',
                    accounts: [],
                    predicate: (account) => account.isVerified()
                },
                {
                    name: 'Unverified',
                    accounts: [],
                    predicate: (account) => !account.isVerified()
                }
            ]);
        } else if (view === 'role') {
            setCategories([
                {
                    name: 'Administrator',
                    accounts: [],
                    predicate: (account) => account.getRole() === AccountRole.Administrator
                },
                {
                    name: 'Doctor',
                    accounts: [],
                    predicate: (account) => account.getRole() === AccountRole.Doctor
                },
                {
                    name: 'Nurse',
                    accounts: [],
                    predicate: (account) => account.getRole() === AccountRole.Nurse
                },
                {
                    name: 'Pharmacist',
                    accounts: [],
                    predicate: (account) => account.getRole() === AccountRole.Pharmacist
                },
                {
                    name: 'Staff',
                    accounts: [],
                    predicate: (account) => account.getRole() === AccountRole.Staff
                },
            ]);
        } else if (view === 'shift') {
            setCategories([
                {
                    name: 'Morning',
                    accounts: [],
                    predicate: (account) => account.getShift() === AccountShift.Morning
                },
                {
                    name: 'Afternoon',
                    accounts: [],
                    predicate: (account) => account.getShift() === AccountShift.Afternoon
                },
                {
                    name: 'Night',
                    accounts: [],
                    predicate: (account) => account.getShift() === AccountShift.Night
                }
            ]);
        }

        handleDoRefresh();
    }

    // load accounts
    useEffect(() => {
        categories.forEach((category) => {
            category.accounts = data.filter((it) => {
                return category.predicate(it);
            });
        });

        setRefresh(true);
    }, [data, refresh, categories]);

    return (
        <div>
            {selectedAccount && (
                <StaffSettingsModel
                    account={selectedAccount}
                    onClose={handleCloseModal}
                    doRefresh={handleDoRefresh}
                    doRefetch={handleDoRefetch}
                />
            )}

            <div className="flex flex-col items-left gap-2 pl-8 pt-8">
                <span className="text-black font-semibold text-xl">View By:</span>
                <div className="flex flex-row gap-2">
                    <button
                        className={`${
                            selectedView === 'status' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                        } text-white py-2 px-4 rounded`}
                        onClick={() => changeView('status')}>
                        Status
                    </button>
                    <button
                        className={`${
                            selectedView === 'role' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
                        } text-white py-2 px-4 rounded`}
                        onClick={() => changeView('role')}>
                        Role
                    </button>
                    <button
                        className={`${
                            selectedView === 'shift' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300 hover:bg-gray-400'
                        } text-white py-2 px-4 rounded`}
                        onClick={() => changeView('shift')}>
                        Shift
                    </button>
                </div>
            </div>

            <div className="gap-6 grid grid-cols-1 justify-items-center min-h-screen h-max w-max p-8">
                <div className="flex flex-col gap-6 items-start">
                    {categories.map((category) => {
                        return (
                            <div key={category.name}
                                 className="mb-6 items-start">
                                <h1 className="text-3xl font-bold text-black mb-6 items-start">{category.name}</h1>
                                <div className="flex flex-col gap-6 items-start">
                                    {category.accounts.map((account) => {
                                        return (
                                            <StaffCard
                                                key={account.getUid()}
                                                account={account}
                                                onClick={() => {
                                                    setSelectedAccount(account);
                                                }}
                                            />
                                        );
                                    })}

                                    {category.accounts.length === 0 && (
                                        <p className="text-xl font-bold">No {category.name}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Account[]>([]);
    const [refetch, setRefetch] = useState(false);

    async function fetchData() {
        try {
            console.log('Fetching...')
            const result = await getAllAccounts();
            setData(result);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDoRefetch = () => {
        setRefetch(!refetch)
    }

    useEffect(() => {
        fetchData().then(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchData().then(() => {
            setLoading(false);
        });
    }, [refetch]);

    return (
        <div className="bg-gray-100">
            <LeftNavBar/>

            <div className="ml-32">
                {loading ? <Loading/> : <ActualPage data={data} doRefetch={handleDoRefetch}/>}
            </div>
        </div>
    )
}
