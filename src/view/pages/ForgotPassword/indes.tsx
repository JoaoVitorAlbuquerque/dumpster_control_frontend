import { Button } from "../../components/Button";
import { DevlandLogo } from "../../components/icons/DevlandLogo";
import { Input } from "../../components/Input";
import { useForgotPasswordController } from "./useForgotPasswordController";

export function ForgotPassword() {
  const { register, handleSubmit, errors, isLoading } =
    useForgotPasswordController();

  return (
    <div>
      <header className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Redefinir senha
        </h1>

        <span className="text-lg font-semibold text-zinc-600 tracking-[-1px]">
          Se existir uma conta, enviamos um e-mail.
        </span>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="flex flex-col">
          <Button
            type="submit"
            className="mt-2 cursor-pointer"
            isLoading={isLoading}
          >
            Enviar link para resetar senha
          </Button>

          <div className="flex items-center justify-end mt-4">
            <DevlandLogo />
          </div>
        </div>
      </form>
    </div>
  );
}
