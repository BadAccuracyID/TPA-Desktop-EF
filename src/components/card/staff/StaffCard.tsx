import {AccountRole} from "@/components/objects/AccountRole";
import {formatDate, toDateFromSeconds} from "@/utils/AccountUtils";
import {Account} from "@/components/objects/Account";
import {XMarkIcon} from "@heroicons/react/20/solid";

export const StaffCard = ({id, name, email, role, verified, createdAt, verifiedBy, verifiedAt, onClick}: {
    id: string;
    name: string;
    email: string;
    role: AccountRole;
    verified: boolean;
    createdAt: any | null;
    verifiedBy: string | null;
    verifiedAt: any | null;
    onClick: () => void;
}) => {
    return (
        <div className="relative bg-white text-black shadow-lg h-max flex flex-col rounded-md p-4"
             onClick={onClick}>
            <span className="text-xl font-bold">{name}</span>
            <span className="">UID: {id}</span>
            <span className="">Role: {role.toString()}</span>
            <span className="">Email: {email}</span>
            <span className="">Verified: {verified ? 'Yes' : 'No'}</span>
        </div>
    )
}

export const StaffSettingsModel = ({account, onClose}: {
    account: Account;
    onClose: () => void;
}) => {
    const createdAt: any | null = account.getCreatedAt();
    const verifiedAt: any | null = account.getVerifiedAt();

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="relative bg-white text-black shadow-lg rounded-md p-4">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">{account?.getName()}</h2>
                    <button
                        className="p-1 rounded-full hover:bg-gray-300 focus:outline-none"
                        onClick={handleClose}
                    >
                        <XMarkIcon className="h-6 w-6"/>
                    </button>
                </div>
                <div className="mt-4">
                    <p className="text-sm">
                        <span className="font-semibold">UID:</span> {account.getUid()}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Role:</span> {account.getRole().toString()}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Email:</span> {account.getEmail()}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Created At:</span>{" "}
                        {createdAt ? formatDate(toDateFromSeconds(createdAt)) : "Unknown"}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Verified:</span> {account.isVerified() ? "Yes" : "No"}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Verified By:</span> {account.getVerifiedBy()}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Verified At:</span>{" "}
                        {verifiedAt ? formatDate(toDateFromSeconds(verifiedAt)) : "Never"}
                    </p>
                </div>
            </div>
        </div>
    )
}
