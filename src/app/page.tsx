import Link from "next/link";

export default function Home() {
    return (
        <div className="bg-gray-100 text-white">
            {/* Main Section */}
            <section className="flex flex-col items-center justify-center h-screen px-6 sm:px-0">
                <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-center text-black">
                    SiLVoam Hospital Manager
                </h1>
                <p className="text-lg sm:text-xl text-center text-black">
                    Hospital Management System for SiLVoam Hospital
                </p>
                <section
                    className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                    <Link href={'/auth/login'}>
                        <button
                            className="w-full sm:w-auto px-8 py-3 text-base sm:text-xl font-medium bg-blue-700 hover:bg-blue-800 rounded-full transition-colors duration-150">
                            Login
                        </button>
                    </Link>
                    <Link href={'/auth/register'}>
                        <button
                            className="w-full sm:w-auto px-8 py-3 text-base sm:text-xl font-medium bg-blue-700 hover:bg-blue-800 rounded-full transition-colors duration-150">
                            Register
                        </button>
                    </Link>
                </section>
            </section>
        </div>
    )
}
