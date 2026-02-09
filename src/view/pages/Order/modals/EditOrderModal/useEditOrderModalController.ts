import z from "zod";
import type { Request } from "../../../../../app/entities/Request";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestsService } from "../../../../../app/services/requestsService";
import toast from "react-hot-toast";
import type { UpdateRequestParams } from "../../../../../app/services/requestsService/update";

const schema = z.object({
  activity: z.enum(["CLEANING", "TREE", "CONSTRUCTION", "GROUND"]).optional(),
  priority: z.enum(["LOW", "HIGH"]).optional(),
  status: z
    .enum([
      "REQUESTED",
      "UNDER_REVIEW",
      "APPROVED",
      "DELIVERED",
      "COMPLETED",
      "CANCELLED",
    ])
    .optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function useEditOrderModalController(
  onClose: () => void,
  order: Request,
) {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors, dirtyFields },
    setError,
    reset,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      activity: order.activity,
      priority: order.priority,
      status: order.status,
      description: order.description,
    },
  });

  const queryClient = useQueryClient();
  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: UpdateRequestParams) => {
      return requestsService.update({
        ...data,
      });
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      // monta patch somente com campos alterados
      const patch = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => {
          const k = key as keyof FormData;
          return Boolean(dirtyFields?.[k]) && value !== undefined;
        }),
      ) as Partial<FormData>;

      // se nada mudou, nem chama API
      if (Object.keys(patch).length === 0) {
        toast("Nenhuma alteração para salvar.");
        return;
      }

      await mutateAsync({
        id: order!.id,
        // ...data,
        ...patch,
      });

      queryClient.invalidateQueries({ queryKey: ["requests"] });
      toast.success("Registro atualizado com sucesso!");
      onClose();
      reset();
    } catch (error: any) {
      toast.error("Erro ao atualizar o registro!");
      if (error.response?.data?.message) {
        setError("root", { message: error.response.data.message });
        toast.error(error.response?.data?.message);
      }
    }
  });

  return {
    register,
    errors,
    handleSubmit,
    isLoading,
    control,
  };
}
