import { Button } from "../../components/Button";
import { DevlandLogo } from "../../components/icons/DevlandLogo";
import { Input } from "../../components/Input";
import { useLoginController } from "./useLoginController";

export function Login() {
  const { register, handleSubmit, errors } = useLoginController();

  return (
    <div>
      <header className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Entre em sua conta
        </h1>
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
            isLoading={false}
          >
            Entrar
          </Button>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
              Esqueci senha
            </span>

            <DevlandLogo />
          </div>
        </div>
      </form>
    </div>
  );
}
