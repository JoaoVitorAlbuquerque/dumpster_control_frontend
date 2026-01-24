import { httpClient } from "../httpClient";

interface MeResponse {
  name: string;
  email: string;
  role: string;
}

export async function me() {
  const { data } = await httpClient.get<MeResponse>("/accounts/me");

  return data;
}
