import { Link } from "react-router-dom";

interface NavigateLinkProps {
  icon?: React.ReactNode;
  linkTo: string;
  children: string;
  onClick?: () => void;
}

export function NavigateLink({ icon, linkTo, children }: NavigateLinkProps) {
  return (
    <div className="flex items-center gap-1 text-teal-600 p-2 hover:bg-teal-500 transition-all rounded-md hover:text-white text-lg">
      {icon}

      <Link to={linkTo} className="hover:underline">
        {children}
      </Link>
    </div>
  );
}
