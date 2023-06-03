'use client'

import LeftNavBar from "@/components/card/LeftNavBar";
import {useEffect, useState} from "react";
import {getAllAccounts} from "@/components/datastore/local/UserManager";
import {Account} from "@/components/objects/Account";
import Loading from "@/components/card/Loading";
import {StaffCard, StaffSettingsModel} from "@/components/card/staff/StaffCard";

const ActualPage = ({data}: { data: Account[] }) => {
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [unverifiedAccounts, setUnverifiedAccounts] = useState<Account[]>([]);
    const [verifiedAccounts, setVerifiedAccounts] = useState<Account[]>([]);

    const handleCloseModal = () => {
        setSelectedAccount(null);
    };

    // load unverified accounts
    useEffect(() => {
        const unverified = data.filter((account) => {
            return !account.isVerified();
        });
        setUnverifiedAccounts(unverified);
    }, [data]);

    // load verified accounts
    useEffect(() => {
        const verified = data.filter((account) => {
            return account.isVerified();
        });
        setVerifiedAccounts(verified);
    }, [data]);

    return (
        <div className="gap-6 grid grid-cols-1 justify-items-center min-h-screen h-max w-max p-8">
            {selectedAccount && (
                <StaffSettingsModel account={selectedAccount} onClose={handleCloseModal}/>
            )}

            <div className="flex flex-col gap-6 items-start">
                <div className="mb-6 items-start">
                    <h1 className="text-3xl font-bold text-black mb-6 items-start">Unverified Accounts</h1>
                    <div className="flex flex-col gap-6 items-start">
                        {unverifiedAccounts.map((account) => {
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

                        {unverifiedAccounts.length === 0 && (
                            <p className="text-xl font-bold">No unverified accounts</p>
                        )}
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-black mb-6">Verified Accounts</h1>
                    <div className="flex flex-col gap-6">
                        {verifiedAccounts.map((account) => {
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
                        {verifiedAccounts.length === 0 && (
                            <p className="text-xl font-bold text-black">No verified accounts</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Account[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getAllAccounts();
                console.log(result)
                setData(result);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData().then(() => {
            setLoading(false);
        });
    }, []);
    return (
        <div className="bg-gray-100">
            <LeftNavBar/>

            <div className="ml-32">
                {loading ? <Loading/> : <ActualPage data={data}/>}
            </div>
        </div>
    )
}
