import { useSideMenu } from "@/Contexts/SideMenuContext";
import { Link } from "@inertiajs/react";
import { FC, ReactNode } from "react";

interface MenuItemProps {
  label: string;
  children: ReactNode;
  url: string;
}

const MenuItem: FC<MenuItemProps> = ({ label, children, url }) => {
  const { isMenuExpanded } = useSideMenu();

  return (
    <li className="mt-5 hover:underline">
      <Link href={url}>
        <div className="flex justify-start items-center">
          {children}
          {isMenuExpanded && (
            <span className="ml-2 text-xs whitespace-nowrap">{label}</span>
          )}
        </div>
      </Link>
    </li>
  );
};

export default MenuItem;
