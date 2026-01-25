import { Outlet } from "react-router-dom";
import logo from "../../assets/logo-moreira_sales.png";
import { SquarePlusIcon } from "../components/icons/SquarePlusIcon";
import { NavigateLink } from "../components/NavigateLink";
import { UserIcon } from "../components/icons/UserIcon";

export function WrappedScreen() {
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

        <div>
          <NavigateLink icon={<UserIcon />} linkTo="/login">
            Log-in
          </NavigateLink>
        </div>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
