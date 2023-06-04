import {AccountRole, roleFromString} from "@/components/objects/AccountRole";
import {formatDate, toDateFromSeconds} from "@/utils/AccountUtils";
import {Account} from "@/components/objects/Account";
import {UserCircleIcon, WrenchIcon, XMarkIcon} from "@heroicons/react/20/solid";
import React, {useState} from "react";
import {AccountShift, shiftFromString, shiftToFull} from "@/components/objects/AccountShift";
import {getAccount, getCurrentAccount} from "@/components/datastore/local/UserManager";
import {deleteAccountData} from "@/components/datastore/firebase/FirebaseManager";
import {deleteAccount} from "@/components/datastore/firebase/admin/FirebaseAdminManager";

export const StaffCard = ({account, onClick}: {
    account: Account;
    onClick: () => void;
}) => {
    return (
        <div className="relative bg-white text-black shadow-lg h-max flex flex-col rounded-md p-4">
            <div className="flex flex-row gap-1.5 mb-2 items-center">
                <UserCircleIcon className="w-7"/>
                <span className="text-xl font-bold overflow-clip">{account.getName()}</span>

                <WrenchIcon
                    className="ml-auto w-7 h-auto bg-blue-600 hover:bg-blue-500 p-1 text-white rounded-md cursor-pointer"
                    onClick={onClick}/>
            </div>

            <p>
                <span className="font-semibold">UID:</span> {account.getUid()}
            </p>

            {account.isVerified() ?
                <div>
                    <p>
                        <span className="font-semibold">Role:</span> {account.getRole().toString()}
                    </p>
                    <p>
                        <span className="font-semibold">Shift:</span> {shiftToFull(account.getShift())}
                    </p>
                </div> : <div></div>}

            <p>
                <span className="font-semibold">Email:</span> {account.getEmail()}
            </p>
            <p>
                <span className="font-semibold">Verified:</span> {account.isVerified() ? "Yes" : "No"}
            </p>

        </div>
    )
}

export const StaffSettingsModel = ({account, onClose, doRefresh}: {
    account: Account;
    onClose: () => void;
    doRefresh: () => void;
}) => {
    const createdAt: any | null = account.getCreatedAt();
    const verifiedAt: any | null = account.getVerifiedAt();
    const [selectedRole, setSelectedRole] = useState(account.getRole().toString());
    const [shift, setShift] = useState(account.getShift().toString());

    const handleClose = () => {
        onClose();
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(event.target.value);
    };

    const handleShiftChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setShift(event.target.value);
    }

    const handleRoleSet = () => {
        if (account.getRole().toString() === selectedRole) {
            return;
        }

        const role = account.setRole(roleFromString(selectedRole), true);
        if (role instanceof Promise) {
            role.then(() => {
                onClose();
                doRefresh();
            });
        }
    }

    const handleVerifyAccount = () => {
        getCurrentAccount().then((currentAccount) => {
            if (!currentAccount) {
                return;
            }
            if (currentAccount.getRole() !== AccountRole.Administrator) {
                return;
            }
            if (shift == "Unknown" || shift == "Select Shift") {
                return;
            }

            account.verify(currentAccount.getName(), shiftFromString(shift))
                .then(() => {
                    onClose();
                    doRefresh();
                });
        });
    };

    const handleDeleteAccount = () => {
        // get the user
        getAccount(account.getUid()).then((account) => {
            if (!account) {
                return;
            }

            deleteAccountData(account.getUid()).then(() => {
                deleteAccount(account.getEmail()).then(() => {
                    onClose();
                    doRefresh();
                });
            });
        })
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-50"
                 onClick={handleClose}/>

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
                    <p>
                        <span className="font-semibold">UID:</span> {account.getUid()}
                    </p>
                    <p>
                        <span className="font-semibold">Role:</span> {account.getRole().toString()}
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span> {account.getEmail()}
                    </p>
                    <p>
                        <span className="font-semibold">Created At:</span> {" "}
                        {createdAt ? formatDate(toDateFromSeconds(createdAt)) : "Unknown"}
                    </p>
                    <p>
                        <span className="font-semibold">Verified:</span> {account.isVerified() ? "Yes" : "No"}
                    </p>
                    {account.isVerified() ?
                        <div>
                            <p>
                                <span className="font-semibold">Verified By:</span> {account.getVerifiedBy()}
                            </p>
                            <p>
                                <span className="font-semibold">Verified At:</span> {" "}
                                {verifiedAt ? formatDate(toDateFromSeconds(verifiedAt)) : "Never"}
                            </p>
                        </div> : <div></div>}
                </div>

                {/* Account Verification */}
                {account.isVerified() ? <div></div> :
                    <div className="pt-2 flex flex-col gap-2">
                        <label htmlFor="roleSelect" className="font-semibold">
                            Verify Staff:
                        </label>
                        <div className="flex flex-row gap-2">
                            <select
                                id="shiftSelect"
                                value={shift}
                                onChange={handleShiftChange}
                                className="border border-gray-300 rounded-md p-2 w-full">
                                {
                                    Object.values(AccountShift)
                                        .map((shift) => {
                                            return (
                                                <option key={shift.toString()} value={shift.toString()}>
                                                    {shiftToFull(shift)}
                                                </option>
                                            )
                                        })
                                }
                            </select>
                            <button
                                onClick={handleVerifyAccount}>
                                <span className="text-white bg-blue-600 hover:bg-blue-500 p-2 rounded-md">
                                    Confirm
                                </span>
                            </button>
                        </div>
                    </div>
                }

                {/* Role selection */}
                <div className="pt-4 flex flex-col gap-2">
                    <label htmlFor="roleSelect" className="font-semibold">
                        Change Role:
                    </label>
                    <div className="flex flex-row gap-2">
                        <select
                            id="roleSelect"
                            value={selectedRole}
                            onChange={handleRoleChange}
                            className="border border-gray-300 rounded-md p-2 w-full">
                            {
                                Object.values(AccountRole)
                                    .map((role) => {
                                        return (
                                            <option key={role.toString()} value={role.toString()}>
                                                {role.toString()}
                                            </option>
                                        )
                                    })
                            }
                        </select>
                        <button
                            onClick={handleRoleSet}>
                                <span className="text-white bg-green-500 hover:bg-green-400 p-2 rounded-md">
                                    Confirm
                                </span>
                        </button>
                    </div>
                </div>


                <button className="pt-4 w-full flex flex-col"
                        onClick={handleDeleteAccount}>
                    <p className="text-white bg-red-600 hover:bg-red-500 p-2 w-full rounded-md">
                        Delete Account
                    </p>
                </button>
            </div>
        </div>
    )
}
