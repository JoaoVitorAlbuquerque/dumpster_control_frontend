import { Controller } from "react-hook-form";
import { FormTextarea } from "../../components/FormTextarea";
import { Input } from "../../components/Input";
import { useRequestController } from "./useRequestController";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";

export function Request() {
  const { isLoading, errors, handleSubmit, register, control } =
    useRequestController();

  return (
    <div className="flex h-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 rounded-sm"
      >
        <div>
          <div className="flex flex-col items-center gap-2 bg-[#00000008] border-b border-b-gray-300 p-4 rounded-md">
            <span className="text-2xl font-semibold">
              Solicitação de Caçamba
            </span>

            {/* <div className="flex items-center justify-center gap-2">
              <span className="text-amber-500">⚠️ Região não compatível</span>
              <div className="size-4 rounded-full bg-amber-500 animate-pulse" />
            </div> */}
          </div>

          <div className="flex items-center py-2 px-6 shadow-lg">
            <span>
              Região compatível: <strong>Moreira Sales /PR</strong>. Verifique
              seu protocolo via E-mail!
            </span>
          </div>
        </div>

        <div className="px-6 mt-4 space-y-2">
          <Input
            placeholder="CPF *"
            error={errors.cpf?.message}
            {...register("cpf")}
          />

          <Input
            placeholder="E-mail *"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            placeholder="Endereço *"
            error={errors.address?.message}
            {...register("address")}
          />

          <Input
            placeholder="Nome *"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            placeholder="Contato *"
            error={errors.contact?.message}
            {...register("contact")}
          />

          <Controller
            control={control}
            name="activity"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Atividade *"
                onChange={onChange}
                value={value}
                error={errors.activity?.message}
                options={[
                  {
                    value: "CLEANING",
                    label: "Limpeza",
                  },
                  {
                    value: "TREE",
                    label: "Árvore",
                  },
                  {
                    value: "CONSTRUCTION",
                    label: "Construção",
                  },
                  {
                    value: "GROUND",
                    label: "Terra",
                  },
                ]}
              />
            )}
          />

          <FormTextarea
            label="Observações"
            placeholder="Digite aqui..."
            error={errors.description?.message}
            {...register("description")}
          />
        </div>

        <div className="mt-8 px-6 pb-2">
          <Button
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
          >
            Solicitar
          </Button>
        </div>
      </form>
    </div>
  );
}
