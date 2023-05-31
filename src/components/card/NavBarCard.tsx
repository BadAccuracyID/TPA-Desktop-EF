import Link from "next/link";

export default function NavBarCard() {
    return (
        <div className="pb-19">
            <nav
                className="navbar fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 gap-6 bg-blue-800 w-full z-50 text-white">

                <div className="flex items-center text-center space-x-8 max-h-56 overflow-y-auto">
                    <img
                        src="https://luckynet.work/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.e22b7a94.png&w=640&q=75"
                        alt="logo"
                        className="w-12 h-auto object-contain"
                    />

                    <Link href={'/'}>
                        <p className="font-medium hover:text-gray-300 w-max">Home</p>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
