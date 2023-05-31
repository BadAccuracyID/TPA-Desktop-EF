import React from "react";
import {AccountRole} from "@/components/objects/AccountRole";
import {
    BeakerIcon,
    CalendarIcon,
    HomeIcon,
    MapIcon,
    NewspaperIcon,
    UserIcon,
    UsersIcon
} from "@heroicons/react/20/solid";
import Link from "next/link";

interface MenuItem {
    name: string;
    icon: React.ReactNode;
    requiredRoles: AccountRole[];
    redirectLink: string;
}

const menuIconAttr = "h-8 w-auto text-white";
const menuItems: MenuItem[] = [
    {
        name: 'Home',
        icon: <HomeIcon className={menuIconAttr}/>,
        requiredRoles: [AccountRole.Administrator],
        redirectLink: '/dashboard'
    },
    {
        name: 'Appointment',
        icon: <CalendarIcon className={menuIconAttr}/>,
        requiredRoles: [AccountRole.Administrator],
        redirectLink: '/appointment'
    },
    {
        name: 'Prescription',
        icon: <BeakerIcon className={menuIconAttr}/>,
        requiredRoles: [AccountRole.Administrator],
        redirectLink: '/prescription'
    },
    {
        name: 'Patient',
        icon: <UserIcon className={menuIconAttr}/>,
        requiredRoles: [AccountRole.Administrator],
        redirectLink: '/patient'
    },
    {
        name: 'Staff',
        icon: <UsersIcon className={menuIconAttr}/>,
        requiredRoles: [AccountRole.Administrator],
        redirectLink: '/staff'
    },
    {
        name: 'Transportation',
        icon: <MapIcon className={menuIconAttr}/>,
        requiredRoles: [AccountRole.Administrator],
        redirectLink: '/transportation'
    },
    {
        name: 'Certificate',
        icon: <NewspaperIcon className={menuIconAttr}/>,
        requiredRoles: [AccountRole.Administrator],
        redirectLink: '/certificate'
    },
]

export default function LeftNavBar() {
    const username = 'John Doe'; // Replace with actual username

    return (
        <div className="fixed left-0 top-0 h-screen bg-blue-800 py-4 px-2 flex flex-col justify-start items-center">
            <ul className="w-full max-h-full overflow-y-auto flex-grow">
                {menuItems.map((menuItem, index) => (
                    <li key={index}>
                        <Link
                            className="flex flex-col items-center text-white py-2.5 px-1 hover:bg-blue-500 cursor-pointer rounded-xl"
                            href={menuItem.redirectLink}
                        >
                            {menuItem.icon}
                            <span className="text-sm py-1">{menuItem.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="flex flex-col items-center justify-end bg-blue-800 py-4 px-2">
                <div className="flex flex-col items-center text-white mb-4">
                    <UserIcon className="h-8 text-white"/>
                    {username}
                </div>
                <Link
                    href="/login"
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Logout
                </Link>
            </div>
        </div>
    )
}