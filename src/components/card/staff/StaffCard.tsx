import {AccountRole} from "@/components/objects/AccountRole";
import {formatDate, toDateFromSeconds} from "@/utils/AccountUtils";
import {Account} from "@/components/objects/Account";
import {UserCircleIcon, WrenchIcon, XMarkIcon} from "@heroicons/react/20/solid";

export const StaffCard = ({id, name, email, role, verified, onClick}: {
    id: string;
    name: string;
    email: string;
    role: AccountRole;
    verified: boolean;
    onClick: () => void;
}) => {
    return (
        <div className="relative bg-white text-black shadow-lg h-max flex flex-col rounded-md p-4">
            <div className="flex flex-row gap-1.5 mb-2 items-center">
                <UserCircleIcon className="w-7"/>
                <span className="text-xl font-bold overflow-clip">{name}</span>

                <WrenchIcon
                    className="ml-auto w-7 h-auto bg-blue-600 hover:bg-blue-500 p-1 text-white rounded-md cursor-pointer"
                    onClick={onClick}/>
            </div>

            <p className="">
                <span className="font-semibold">UID:</span> {id}
            </p>
            <p className="">
                <span className="font-semibold">Role:</span> {role.toString()}
            </p>
            <p className="">
                <span className="font-semibold">Email:</span> {email}
            </p>
            <p className="">
                <span className="font-semibold">Verified:</span> {verified ? "Yes" : "No"}
            </p>

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
                <div className="flex flex-row items-center gap-1.5">
                    <UserCircleIcon className="w-7"/>
                    <h2 className="text-xl font-bold">{account?.getName()}</h2>
                    <button
                        className="ml-auto p-1 focus:outline-none"
                        onClick={handleClose}>
                        <XMarkIcon className="h-6 w-6 text-red-600"/>
                    </button>
                </div>
                <div className="mt-4">
                    <p className="">
                        <span className="font-semibold">UID:</span> {account.getUid()}
                    </p>
                    <p className="">
                        <span className="font-semibold">Role:</span> {account.getRole().toString()}
                    </p>
                    <p className="">
                        <span className="font-semibold">Email:</span> {account.getEmail()}
                    </p>
                    <p className="">
                        <span className="font-semibold">Created At:</span>{" "}
                        {createdAt ? formatDate(toDateFromSeconds(createdAt)) : "Unknown"}
                    </p>
                    <p className="">
                        <span className="font-semibold">Verified:</span> {account.isVerified() ? "Yes" : "No"}
                    </p>
                    <p className="">
                        <span className="font-semibold">Verified By:</span> {account.getVerifiedBy()}
                    </p>
                    <p className="">
                        <span className="font-semibold">Verified At:</span>{" "}
                        {verifiedAt ? formatDate(toDateFromSeconds(verifiedAt)) : "Never"}
                    </p>
                </div>
            </div>
        </div>
    )
}
