import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import type { RequestProtocolParams } from "../../app/services/requestsService/getProtocol";
import { requestsService } from "../../app/services/requestsService";

const schema = z.object({
  protocol: z.string().nonempty("Protocolo é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function useProtocolConsultPageController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    setError,
    reset,
    control,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    data: protocolData,
    mutateAsync,
    isPending: isLoading,
  } = useMutation({
    mutationFn: async (data: RequestProtocolParams) => {
      return requestsService.getProtocol(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({ ...data });
      toast.success("Protocolo consultado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao consultar protocolo.");
      if (error.response?.data?.message) {
        setError("root", { message: error.response.data.message });
        toast.error(error.response?.data?.message);
      }
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    setError,
    reset,
    control,
    setValue,
    isLoading,
    protocolData,
  };
}
