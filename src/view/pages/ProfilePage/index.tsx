import { useAuth } from "../../../app/hooks/useAuth";
import { Input } from "../../components/Input";
// import { Link } from "react-router-dom";

export function ProfilePage() {
  const { user } = useAuth();

  // const { register, errors, handleSubmit, isLoading } =
  //   useProfilePageController(user!);

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Meu Perfil
        </h1>

        <form className="space-y-4">
          <Input
            type="text"
            placeholder="Nome"
            name="name"
            value={user?.name || ""}
            disabled
          />

          {/* <Input
            type="text"
            placeholder="CPF (somente números)"
            {...register("cpf")}
            error={errors.cpf?.message}
            disabled
          /> */}

          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            value={user?.email || ""}
            disabled
          />

          <Input
            type="text"
            placeholder="Cargo"
            name="role"
            value={user?.role || ""}
            disabled
          />

          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Função
            </label>
            <select
              // {...register("role")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="USER">Usuário</option>
              <option value="OPERATOR">Operador</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("isActive")} />
            <input type="checkbox" />
            <label className="text-sm text-gray-700">Conta ativa</label>
          </div> */}

          {/* <Link
            to="/admin/forgot-password"
            className="text-teal-500 hover:underline"
          >
            Esqueceu senha? Clique aqui
          </Link> */}
        </form>
      </div>
    </div>
  );
}
