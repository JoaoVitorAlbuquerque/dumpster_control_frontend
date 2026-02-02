import { Transition } from "@headlessui/react";
import logo from "../../assets/logo-moreira_sales.png";
import { Spinner } from "./Spinner";

interface LauchScreenProps {
  isLoading: boolean;
}

export function LauchScreen({ isLoading }: LauchScreenProps) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-white fixed top-0 left-0 w-full h-full grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="logo" className="w-9 h-9" />

            <span className="text-4xl text-teal-600">DUMPSTER CONTROL</span>
          </div>

          <Spinner className="text-white fill-teal-700" />
        </div>
      </div>
    </Transition>
  );
}
