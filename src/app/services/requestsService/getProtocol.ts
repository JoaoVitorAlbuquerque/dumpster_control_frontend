import { httpClient } from "../httpClient";

type RequestDetails = {
  id: string;
  protocol: string;
  name: string;
  description?: string;
  addressFormatted?: string;
  status:
    | "REQUESTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "DELIVERED"
    | "COMPLETED"
    | "CANCELLED";
  priority?: string;
  createdAt: string;
  deliveryDate?: string | null;
  activity?: string | null;
};

export interface RequestProtocolParams {
  protocol: string;
}

export async function getProtocol(params: RequestProtocolParams) {
  const { data } = await httpClient.get<RequestDetails>(
    `/requests/${params.protocol}/protocol`,
  );

  return data;
}
