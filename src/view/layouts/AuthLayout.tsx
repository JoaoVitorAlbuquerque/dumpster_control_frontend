import { Outlet } from "react-router-dom";

import logo from "../../assets/logo-moreira_sales.png";

export function AuthLayout() {
  return (
    <div className="flex h-screen bg-zinc-300 justify-center items-center">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-2xl w-full max-w-xl space-y-6 mx-4 lg:mx-0">
        <img
          src={logo}
          className="object-contain w-full h-full max-w-2/4 max-h-3/4 select-none rounded-4xl"
        />

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
