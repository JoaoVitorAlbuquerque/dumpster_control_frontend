import { httpClient } from "../httpClient";

export interface UpdateAccountParams {
  id: string;
  name?: string;
  // cpf?: string;
  // email?: string;
  // role?: "USER" | "OPERATOR" | "ADMIN";
  // isActive?: boolean;
}

export async function update({ id, ...params }: UpdateAccountParams) {
  const { data } = await httpClient.patch(`/accounts/${id}`, params);

  return data;
}
