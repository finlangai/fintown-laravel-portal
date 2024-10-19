import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        
    <div className="flex flex-col sm:justify-center items-center bg-gray-100 pt-6 sm:pt-0 min-h-screen relative" 
        style={{ backgroundImage: `url('https://i.pinimg.com/1200x/87/47/14/874714d67edebf95833ad972cf410f67.jpg')`, backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-black opacity-85"></div>
        {children}
    </div>
    
    );
}
