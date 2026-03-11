import { httpClient } from "../httpClient";

export interface RequestAdminParams {
  cpf: string;
  email?: string;
  address: string;
  name: string;
  contact: string;
  activity: "CLEANING" | "TREE" | "CONSTRUCTION" | "GROUND";
  status:
    | "REQUESTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "DELIVERED"
    | "COMPLETED"
    | "CANCELLED";
  priority: "LOW" | "HIGH";
  description?: string;
}

export async function createAdmin(params: RequestAdminParams) {
  const { data } = await httpClient.post("/requests", params);

  return data;
}
