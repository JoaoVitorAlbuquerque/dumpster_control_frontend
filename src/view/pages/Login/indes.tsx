import { Input } from "../../components/Input";

export function Login() {
  return (
    <div>
      <header className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Entre em sua conta
        </h1>
      </header>

      <form className="mt-16 space-y-4">
        <Input name="e-mail" type="email" placeholder="E-mail" />

        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
