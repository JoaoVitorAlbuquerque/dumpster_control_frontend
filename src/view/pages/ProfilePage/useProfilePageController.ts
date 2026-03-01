// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import z from "zod";
// import type { UpdateAccountParams } from "../../../app/services/usersService.ts/update";
// import { usersService } from "../../../app/services/usersService.ts";
// import toast from "react-hot-toast";
// import type { User } from "../../../app/entities/User.ts";

// const schema = z.object({
//   name: z.string().min(1, "Nome é obrigatório."),
//   cpf: z
//     .string()
//     .min(11, "CPF deve ter no mínimo 11 dígitos.")
//     .max(11, "CPF deve ter no máximo 11 dígitos."),
//   email: z.email("Email inválido."),
//   role: z.enum(["USER", "OPERATOR", "ADMIN"]),
// });

// type FormData = z.infer<typeof schema>;

// export function useProfilePageController(user: User) {
//   const {
//     handleSubmit: hookFormSubmit,
//     register,
//     formState: { errors },
//     setError,
//     reset,
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       name: user.name,
//       // cpf: user.cpf,
//       email: user.email,
//       role: user.role,
//     },
//   });

//   const queryClient = useQueryClient();
//   const { isPending: isLoading, mutateAsync } = useMutation({
//     mutationFn: async (data: UpdateAccountParams) => {
//       return usersService.update(data);
//     },
//   });

//   const handleSubmit = hookFormSubmit(async (data) => {
//     try {
//       await mutateAsync({
//         ...data,
//         // id: user.id,
//       });

//       queryClient.invalidateQueries({ queryKey: ["accounts"] });
//       toast.success("Conta atualizada com sucesso!");
//       reset();
//     } catch (error: any) {
//       toast.error("Erro ao atualizar conta!");
//       if (error.response?.data?.message) {
//         setError("root", { message: error.response.data.message });
//         toast.error(error.response?.data?.message);
//       }
//     }
//   });

//   return {
//     register,
//     errors,
//     handleSubmit,
//     isLoading,
//   };
// }
