import { Outlet } from "react-router-dom";
import logo from "../../assets/logo-moreira_sales.png";
import { SquarePlusIcon } from "../components/icons/SquarePlusIcon";
import { NavigateLink } from "../components/NavigateLink";
import { UserIcon } from "../components/icons/UserIcon";
import { useAuth } from "../../app/hooks/useAuth";
import { SearchIcon } from "../components/icons/SearchIcon";
import { MapPinned } from "../components/icons/MapPinned";
import { SheetIcon } from "../components/icons/SheetIcon";
import { HomeIcon } from "../components/icons/HomeIcon";
import { UserMenu } from "../components/UserMenu";
import { TriangleAlertIcon } from "../components/icons/TriangleAlertIcon";

export function WrappedScreen() {
  const { signedIn } = useAuth();

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc]">
      <header className="flex items-center justify-between bg-white max-h-[12%] shadow-md py-3 px-14">
        <img
          src={logo}
          alt="Logo"
          className="object-contain h-full select-none rounded-4xl"
        />

        <div className="flex gap-4">
          {signedIn ? (
            <>
              <NavigateLink icon={<HomeIcon />} linkTo="/">
                Home
              </NavigateLink>

              <NavigateLink icon={<SquarePlusIcon />} linkTo="/orders">
                Solicitar Caçamba
              </NavigateLink>

              <NavigateLink icon={<SheetIcon />} linkTo="/reports">
                Pedidos
              </NavigateLink>

              <NavigateLink
                icon={<TriangleAlertIcon />}
                linkTo="/abuse-monitoring"
              >
                Alertas
              </NavigateLink>

              <NavigateLink
                icon={<SearchIcon />}
                linkTo="/admin/consult-protocol"
              >
                Consultar Protocolo
              </NavigateLink>

              <NavigateLink icon={<MapPinned />} linkTo="/map">
                Mapa
              </NavigateLink>
            </>
          ) : (
            <>
              <NavigateLink icon={<SquarePlusIcon />} linkTo="/">
                Solicitar Caçamba
              </NavigateLink>

              <NavigateLink icon={<SearchIcon />} linkTo="/consult-protocol">
                Consultar Protocolo
              </NavigateLink>
            </>
          )}
        </div>

        {!signedIn ? (
          <div>
            <NavigateLink icon={<UserIcon />} linkTo="/login">
              Log-in
            </NavigateLink>
          </div>
        ) : (
          // <div className="text-gray-700 font-medium">Olá, {user?.name}</div>
          <UserMenu />
        )}
      </header>

      <main className="flex-1 mt-4">
        <Outlet />
      </main>

      <footer className="w-full bg-white px-4 shadow-2xl mt-2">
        Developed by <span className="text-gray-800 font-bold">CodeLand</span> -
        Todos os direitos reservados®
      </footer>
    </div>
  );
}
