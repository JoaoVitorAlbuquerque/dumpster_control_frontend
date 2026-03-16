import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavigateLink } from "./NavigateLink";
import { useLocation } from "react-router-dom";

export function MobileMenu({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Fecha o menu sempre que a rota mudar
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {open && (
        <div className="fixed inset-0 z-40" onClick={handleOutsideClick}>
          <div
            ref={menuRef}
            className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col p-4 gap-3 z-50"
            onClick={(e) => e.stopPropagation()}
          >
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
        </div>
      )}
    </div>
  );
}
