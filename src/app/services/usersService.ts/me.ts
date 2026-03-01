import { httpClient } from "../httpClient";

interface MeResponse {
  // id: string;
  // cpf: string;
  name: string;
  email: string;
  role: "USER" | "OPERATOR" | "ADMIN";
}

export async function me() {
  const { data } = await httpClient.get<MeResponse>("/accounts/me");

  return data;
}
