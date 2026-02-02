import type { Request } from "../../entities/Request";
import { httpClient } from "../httpClient";

type RequestResponse = {
  data: Request[];
  totalCount: number;
};

export type Status =
  | "REQUESTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED";

export type RequestFilters = {
  startDate?: Date;
  endDate?: Date;
  accountId?: null;
  status?: Status;
};

export async function getAll(
  filters: RequestFilters & { page: number; perPage: number },
): Promise<RequestResponse> {
  const params: Record<string, any> = {
    page: filters.page,
    perPage: filters.perPage,

    startDate: filters.startDate ? filters.startDate.toISOString() : undefined,

    endDate: filters.endDate ? filters.endDate.toISOString() : undefined,

    accountId: filters.accountId === null ? "null" : undefined,

    status: filters.status ?? undefined,
  };

  // remove tudo que for undefined (não vai pra query)
  Object.keys(params).forEach(
    (key) => params[key] === undefined && delete params[key],
  );

  const { data } = await httpClient.get<RequestResponse>("/requests", {
    params,
  });

  return data;
}
