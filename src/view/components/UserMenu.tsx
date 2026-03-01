import { ExitIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "./DropdownMenu";
import { useAuth } from "../../app/hooks/useAuth";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "./icons/HomeIcon";
import { UserCogIcon } from "./icons/UserCogIcon";

export function UserMenu() {
  const { signout, user } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100 cursor-pointer">
          <span className="text-sm tracking-[-0.5px] text-teal-700 font-medium">
            {user?.name.slice(0, 1).toLocaleUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={signout}
        >
          Sair
          <ExitIcon className="w-6 h-6" />
        </DropdownMenu.Item>

        <DropdownMenu.Item className="flex items-center gap-2">
          <HomeIcon className="w-6 h-6" />
          <NavLink to="/">Home</NavLink>
        </DropdownMenu.Item>

        <DropdownMenu.Item className="flex items-center gap-2">
          <UserCogIcon className="w-6 h-6" />
          <NavLink to="/settings">Configurar Perfil</NavLink>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
