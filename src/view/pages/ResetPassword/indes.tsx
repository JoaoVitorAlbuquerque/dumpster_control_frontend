import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useResetPasswordController } from "./useResetPasswordController";

export function ResetPassword() {
  const { register, handleSubmit, errors, isLoading } =
    useResetPasswordController();

  return (
    <div className="flex flex-col size-full items-center">
      <div className="min-w-2/5 border border-gray-200 px-8 py-10 rounded-lg shadow-sm">
        <header className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
            Altere sua senha
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
          <Input
            type="password"
            placeholder="Senha nova *"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />

          {/* <Input
            type="password"
            placeholder="Confirmar senha *"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          /> */}

          <div className="flex flex-col">
            <Button
              type="submit"
              className="mt-2 cursor-pointer"
              isLoading={isLoading}
            >
              Alterar senha
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
