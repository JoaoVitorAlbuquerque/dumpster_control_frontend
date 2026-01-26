import { httpClient } from "../httpClient";

export interface ForgotPasswordParams {
  email: string;
}

export async function forgotPassword(params: ForgotPasswordParams) {
  const { data } = await httpClient.post("/auth/forgot-password", params);

  return data;
}
