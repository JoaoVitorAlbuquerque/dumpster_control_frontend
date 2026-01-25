import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { DevlandLogo } from "../../components/icons/DevlandLogo";
import { Input } from "../../components/Input";
import { useLoginController } from "./useLoginController";

export function Login() {
  const { register, handleSubmit, errors, isLoading } = useLoginController();

  return (
    <div>
      <header className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Entre em sua conta
        </h1>

        <span className="text-lg font-semibold text-zinc-600 tracking-[-1px]">
          Gerencie as caçambas de sua cidade em tempo real.
        </span>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex flex-col">
          <Button
            type="submit"
            className="mt-2 cursor-pointer"
            isLoading={isLoading}
          >
            Entrar
          </Button>

          <div className="flex items-center justify-between mt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Esqueci senha
            </Link>

            <DevlandLogo />
          </div>
        </div>
      </form>
    </div>
  );
}
