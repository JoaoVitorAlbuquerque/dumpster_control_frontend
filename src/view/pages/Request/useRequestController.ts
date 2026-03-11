import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { requestsService } from "../../../app/services/requestsService";
import type { RequestParams } from "../../../app/services/requestsService/create";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  cpf: z
    .string()
    .min(11, "CPF deve ter no mínimo 11 dígitos.")
    .max(11, "CPF deve ter no máximo 11 dígitos."),
<<<<<<< HEAD
  email: z.string().optional(),
=======
  email: z.email("Email inválido.").optional(),
>>>>>>> 58e0961da6e34bbd99628501cf61b754f0f29d2d
  address: z.string().min(1, "Endereço é obrigatório."),
  name: z.string().min(1, "Nome é obrigatório."),
  contact: z.string().min(1, "Número de contato é obrigatório."),
  activity: z.enum(["CLEANING", "TREE", "CONSTRUCTION", "GROUND"]),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function useRequestController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    setError,
    reset,
    control,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: RequestParams) => {
      return requestsService.create(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const result = await mutateAsync({
        ...data,
      });

      console.log("Solicitação criada:", result);

      navigate(`/request/success/${result.protocol}/${data.activity}`);
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      toast.success("Solicitação feita com sucesso!");
      reset();
    } catch (error: any) {
      toast.error("Erro ao cadastrar solicitação!");
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
    setValue,
  };
}
