import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/application-logo";
import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";

type AuthenticatedProps = PropsWithChildren<{
    header: (setIsExpanded: (value: boolean) => void, isExpanded: boolean) => ReactNode;
}>;

export default function Authenticated({ header, children }: AuthenticatedProps) {
    const user = usePage().props.auth?.user || { name: "Nguyễn Kim Hùng", email: "Email@example.com" };
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const handleSetIsExpanded = (value: boolean) => {
        setIsExpanded(value);
    };
    return (
        <div className="bg-gray-100 min-h-screen flex transition-all duration-300">
            <header className={`bg-background-active shadow ${isExpanded ? 'w-60' : 'w-20'} transition-all duration-300 ease-in-out`} onMouseLeave={() => setIsExpanded(false)}>
                <div className="h-full ml-3">
                    {header ? header(handleSetIsExpanded, isExpanded) : null}
                </div>
            </header>
            <div className="flex-1 transition-all">
                <nav className="bg-background-active">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex items-center shrink-0">
                                    <Link href="/">
                                        <ApplicationLogo className="block w-auto h-9 text-white fill-current" />
                                    </Link>
                                </div>
                            </div>
                            {/* Thông tin người dùng */}
                            <div className="sm:flex sm:items-center hidden sm:ms-6">
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center bg-white px-3 py-2 border border-transparent rounded-md font-medium text-gray-500 text-sm hover:text-gray-700 leading-4 focus:outline-none transition duration-150 ease-in-out"
                                                >
                                                    {user.name}
                                                    <svg
                                                        className="w-4 h-4 -me-0.5 ms-2"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link href={route("profile.edit")}>
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Phần content */}
                <main className="p-4 bg-background-theme">{children}</main>
            </div>
        </div>
    );
}
