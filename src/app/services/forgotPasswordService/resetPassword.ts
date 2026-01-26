import { httpClient } from "../httpClient";

export interface ResetPasswordParams {
  token: string;
  newPassword: string;
}

export async function resetPassword(params: ResetPasswordParams) {
  const { data } = await httpClient.post("/auth/reset-password", params);

  return data;
}
