import { Outlet } from "react-router-dom";
import logo from "../../assets/logo-moreira_sales.png";
import { SquarePlusIcon } from "../components/icons/SquarePlusIcon";
import { NavigateLink } from "../components/NavigateLink";
import { UserIcon } from "../components/icons/UserIcon";
import { useAuth } from "../../app/hooks/useAuth";

export function WrappedScreen() {
  const { signedIn, user } = useAuth();

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc]">
      <header className="flex items-center justify-between bg-white max-h-[12%] shadow-md py-3 px-14">
        <img
          src={logo}
          alt="Logo"
          className="object-contain h-full select-none rounded-4xl"
        />

        <div>
          <NavigateLink icon={<SquarePlusIcon />} linkTo="/">
            Solicitar Caçamba
          </NavigateLink>
        </div>

        {!signedIn ? (
          <div>
            <NavigateLink icon={<UserIcon />} linkTo="/login">
              Log-in
            </NavigateLink>
          </div>
        ) : (
          <div className="text-gray-700 font-medium">Olá, {user?.name}</div>
        )}
      </header>

      <div className="flex-1 mt-4">
        <Outlet />
      </div>

      <footer className="w-full bg-white px-4 shadow-2xl mt-2">
        Developed by <span className="text-gray-800 font-bold">CodeLand</span> -
        Todos os direitos reservados®
      </footer>
    </div>
  );
}
