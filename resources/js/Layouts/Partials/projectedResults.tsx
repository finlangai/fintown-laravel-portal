import { Link } from "@inertiajs/react";

interface ProjectedResultsProps {
  isExpanded: boolean;
}

const ProjectedResults = ({ isExpanded }: ProjectedResultsProps) => {
  return (
   <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  hover:text-white transition duration-300 hover:bg-accent-color ">
      <div className="flex items-center">
         {isExpanded ? (
            <Link href="/projected-results" className="flex justify-center items-center">
               <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-check" > <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /> <path d="m9 9.5 2 2 4-4" /> </svg>
               <span className="whitespace-nowrap ml-4 text-xs">Kết quả dự phóng</span>
            </Link>
         ) : (
            <Link href="/projected-results">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-check" > <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /> <path d="m9 9.5 2 2 4-4" /> </svg>
            </Link>
         )}
      </div>
   </li>
  );
};

export default ProjectedResults;
