import { httpClient } from "../httpClient";

export async function remove(orderId: string) {
  const { data } = await httpClient.patch(`/requests/${orderId}/soft-delete`);

  return data;
}
