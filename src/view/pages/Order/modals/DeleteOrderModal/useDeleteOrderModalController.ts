import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Request } from "../../../../../app/entities/Request";
import { requestsService } from "../../../../../app/services/requestsService";

export function useDeleteOrderModalController(
  onClose: () => void,
  order: Request | null,
) {
  const queryClient = useQueryClient();
  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: async (orderId: string) => {
      return requestsService.remove(orderId);
    },
  });

  async function handleDeleteOrder() {
    try {
      await mutateAsync(order!.id);

      queryClient.invalidateQueries({ queryKey: ["requests"] });
      toast.success("Registro deletado com sucesso!");
      onClose();
    } catch (error) {
      toast.error("Erro ao deletar o registro!");
    }
  }

  return {
    isLoading,
    handleDeleteOrder,
  };
}
