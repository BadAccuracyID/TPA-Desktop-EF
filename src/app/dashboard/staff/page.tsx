'use client'

import LeftNavBar from "@/components/card/LeftNavBar";
import {useEffect, useState} from "react";
import {getAllAccounts} from "@/components/datastore/local/UserManager";
import {Account} from "@/components/objects/Account";
import Loading from "@/components/card/Loading";
import StaffCard from "@/components/card/staff/StaffCard";

const ActualPage = ({data}: { data: Account[] }) => {
    return (
        <div className="gap-6 grid grid-cols-1 justify-items-center min-h-screen h-max p-8">
            {
                data.map((account) => {
                    return <StaffCard key={account.getUid()}
                                      id={account.getUid()}
                                      name={account.getName()}
                                      email={account.getEmail()}
                                      role={account.getRole()}
                                      verified={account.isVerified()}
                                      createdAt={account.getCreatedAt()}
                                      verifiedBy={account.getVerifiedBy()}
                                      verifiedAt={account.getVerifiedAt()}
                    />
                })
            }
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
        <div className="bg-gray-100 text-white">
            <LeftNavBar/>

            {loading ? <Loading/> : <ActualPage data={data}/>}

        </div>
    )
}
