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
import { MobileMenu } from "../components/MobileMenu";

export function WrappedScreen() {
  const { signedIn } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          <img
            src={logo}
            alt="Logo"
            className="h-10 md:h-18 object-contain select-none"
          />

          <div className="hidden md:flex items-center gap-4">
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

          <div className="hidden md:flex">
            {!signedIn ? (
              <NavigateLink icon={<UserIcon />} linkTo="/login">
                Log-in
              </NavigateLink>
            ) : (
              <UserMenu />
            )}
          </div>

          <MobileMenu signedIn={signedIn} />
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-4">
        <Outlet />
      </main>

      <footer className="w-full bg-white px-4 py-3 text-center text-sm shadow-2xl">
        Developed by <span className="text-gray-800 font-bold">CodeLand</span> -
        Todos os direitos reservados®
      </footer>
    </div>
  );
}
