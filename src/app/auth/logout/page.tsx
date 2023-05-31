'use client'

import {signOutUser} from "@/components/datastore/firebase/FirebaseManager";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();

    signOutUser().then(() => {
        router.push('/auth/login');
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <section className="flex flex-col items-center justify-center h-screen px-6 sm:px-0">
                <h1 className="text-4xl sm:text-3xl font-bold mb-8 text-center text-black">
                    Logging out...
                </h1>
            </section>
        </div>
    )
}
