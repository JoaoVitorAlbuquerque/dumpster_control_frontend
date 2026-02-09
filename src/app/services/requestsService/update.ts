import { httpClient } from "../httpClient";

export interface UpdateRequestParams {
  id: string;
  activity?: "CLEANING" | "TREE" | "CONSTRUCTION" | "GROUND";
  priority?: "LOW" | "HIGH";
  status?:
    | "REQUESTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "DELIVERED"
    | "COMPLETED"
    | "CANCELLED";
  description?: string;
}

export async function update({ id, ...params }: UpdateRequestParams) {
  const { data } = await httpClient.patch(`/requests/${id}`, params);

  return data;
}
