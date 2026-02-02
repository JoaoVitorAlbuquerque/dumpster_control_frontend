import type { Status } from "../services/requestsService/getAll";

export function getFiltersFromSearchParams(searchParams: URLSearchParams) {
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const accountId = searchParams.get("accountId");
  const status = searchParams.get("status") as Status | null;

  return {
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
    accountId: accountId === "null" ? null : undefined,
    status: status ?? undefined,
  };
}
