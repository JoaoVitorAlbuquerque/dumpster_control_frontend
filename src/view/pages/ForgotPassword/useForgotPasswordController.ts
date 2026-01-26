import z from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPasswordService } from "../../../app/services/forgotPasswordService";
import type { ForgotPasswordParams } from "../../../app/services/forgotPasswordService/forgotPassword";

const schema = z.object({
  email: z.email("E-mail inválido").nonempty("E-mail é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function useForgotPasswordController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: async (data: ForgotPasswordParams) => {
      return forgotPasswordService.forgotPassword(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);

      toast.success("E-mail enviado com sucesso!");
    } catch {
      toast.error("Erro ao enviar o link.");
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
  };
}
