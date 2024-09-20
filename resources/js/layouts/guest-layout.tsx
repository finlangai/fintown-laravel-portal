import ApplicationLogo from "@/Components/application-logo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col sm:justify-center items-center bg-gray-100 pt-6 sm:pt-0 min-h-screen">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 text-gray-500 fill-current" />
                </Link>
            </div>
            <div className="bg-white shadow-md mt-6 px-6 py-4 sm:rounded-lg w-full sm:max-w-md overflow-hidden">
                {children}
            </div>
        </div>
    );
}
