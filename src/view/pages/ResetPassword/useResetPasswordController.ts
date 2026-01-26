import z from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPasswordService } from "../../../app/services/forgotPasswordService";
import type { ResetPasswordParams } from "../../../app/services/forgotPasswordService/resetPassword";
import { useNavigate, useSearchParams } from "react-router-dom";

const schema = z.object({
  // token: z.string().nonempty(),
  newPassword: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
  // confirmPassword: z.string().min(8, "Confirme a senha"),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "As senhas não conferem",
//   path: ["confirmPassword"], // joga o erro no campo de confirmação
// });

type FormData = z.infer<typeof schema>;

export function useResetPasswordController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    // watch,
    // trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    // mode: "onChange",
    // reValidateMode: "onChange",
  });

  // const passwordValue = watch("password");

  // useEffect(() => {
  //   // quando password muda, recalcula erro de confirmPassword
  //   void trigger("confirmPassword");
  // }, [passwordValue, trigger]);

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token") || "";

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: async (data: ResetPasswordParams) => {
      if (!token) {
        throw new Error("Token ausente");
      }

      return forgotPasswordService.resetPassword({
        token,
        newPassword: data.newPassword,
      });
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const result = await mutateAsync({
        token,
        ...data,
      });

      toast.success("Senha alterada com sucesso!");

      if (result.ok) {
        navigate("/login");
      }
    } catch {
      toast.error("Erro ao alterar a senha. Token inválido ou expirado.");
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
  };
}
