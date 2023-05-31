import {AccountRole} from "@/components/objects/AccountRole";
import {formatDate} from "@/utils/AccountUtils";

export default function StaffCard({id, name, email, role, verified, createdAt, verifiedBy, verifiedAt}: {
    id: string;
    name: string;
    email: string;
    role: AccountRole;
    verified: boolean;
    createdAt: Date;
    verifiedBy: string | null;
    verifiedAt: Date | null;
}) {
    console.log('StaffCard created with id: ' + id)
    return (
        <div className="relative bg-white text-black shadow-lg h-max flex flex-col rounded-md p-4">
            <span className="text-xl font-bold">{name}</span>
            <span className="">UID: {id}</span>
            <span className="">Role: {role.toString()}</span>
            <span className="">Email: {email}</span>
            <span className="">Created At: {formatDate(createdAt)}</span>
            <span className="">Verified: {verified ? 'Yes' : 'No'}</span>
            <span className="">Verified By: {verifiedBy}</span>
            <span className="">Verified At: {verifiedAt ? formatDate(verifiedAt) : 'Never'}</span>
        </div>
    )
}

