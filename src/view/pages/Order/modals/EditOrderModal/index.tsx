import { Controller } from "react-hook-form";
import type { Request } from "../../../../../app/entities/Request";
import { cn } from "../../../../../app/utils/cn";
import { Modal } from "../../../../components/Modal";
import { useEditOrderModalController } from "./useEditOrderModalController";
import { Select } from "../../../../components/Select";
import { FormTextarea } from "../../../../components/FormTextarea";
import { Button } from "../../../../components/Button";

interface EditOrderModalProps {
  open: boolean;
  onClose(): void;
  order: Request;
}

export function EditOrderModal({ open, onClose, order }: EditOrderModalProps) {
  const { isLoading, errors, register, handleSubmit, control } =
    useEditOrderModalController(onClose, order);

  return (
    <Modal title="Editar registro" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          {errors.root && (
            <p className="text-red-500 text-sm mt-1">{errors.root.message}</p>
          )}

          <div
            className={cn(
              "space-y-2",
              // screenLarge < 768 && 'max-h-96 overflow-y-auto space-y-2',
            )}
          >
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
                      label: "Contrução",
                    },
                    {
                      value: "GROUND",
                      label: "Terra",
                    },
                  ]}
                />
              )}
            />

            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => (
                <Select
                  placeholder="Status *"
                  onChange={onChange}
                  value={value}
                  error={errors.status?.message}
                  options={[
                    {
                      value: "REQUESTED",
                      label: "Solicitado",
                    },
                    {
                      value: "UNDER_REVIEW",
                      label: "Em análise",
                    },
                    {
                      value: "APPROVED",
                      label: "Aprovado",
                    },
                    {
                      value: "DELIVERED",
                      label: "Entregue",
                    },
                    {
                      value: "COMPLETED",
                      label: "Concluído",
                    },
                    {
                      value: "CANCELLED",
                      label: "Cancelado",
                    },
                  ]}
                />
              )}
            />

            <Controller
              control={control}
              name="priority"
              render={({ field: { onChange, value } }) => (
                <Select
                  placeholder="Prioridade *"
                  onChange={onChange}
                  value={value}
                  error={errors.priority?.message}
                  options={[
                    {
                      value: "LOW",
                      label: "Baixa",
                    },
                    {
                      value: "HIGH",
                      label: "Alta",
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
        </div>

        <div className="mt-8">
          <Button
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
          >
            Atualizar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
