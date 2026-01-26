import { httpClient } from "../httpClient";

export interface RequestParams {
  cpf: string;
  address: string;
  name: string;
  contact: string;
  activity: "CLEANING" | "TREE" | "CONSTRUCTION" | "GROUND";
  description?: string;
}

export async function create(params: RequestParams) {
  const { data } = await httpClient.post("/requests/public", params);

  return data;
}
