import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z.email("E-mail inválido").nonempty("E-mail é obrigatório"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log("Chama a API:", data);
  });

  return {
    register,
    handleSubmit,
    errors,
  };
}
