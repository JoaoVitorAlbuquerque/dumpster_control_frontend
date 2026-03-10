import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavigateLink } from "./NavigateLink";

export function MobileMenu({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col p-4 gap-3 z-50">
          {signedIn ? (
            <>
              <NavigateLink linkTo="/">Home</NavigateLink>
              <NavigateLink linkTo="/orders">Solicitar Caçamba</NavigateLink>
              <NavigateLink linkTo="/reports">Pedidos</NavigateLink>
              <NavigateLink linkTo="/admin/consult-protocol">
                Consultar Protocolo
              </NavigateLink>
              <NavigateLink linkTo="/abuse-monitoring">Alertas</NavigateLink>
              <NavigateLink linkTo="/map">Mapa</NavigateLink>
            </>
          ) : (
            <>
              <NavigateLink linkTo="/">Solicitar Caçamba</NavigateLink>
              <NavigateLink linkTo="/consult-protocol">
                Consultar Protocolo
              </NavigateLink>
              <NavigateLink linkTo="/login">Log-in</NavigateLink>
            </>
          )}
        </div>
      )}
    </div>
  );
}
