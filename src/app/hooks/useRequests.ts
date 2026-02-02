import { useQuery } from "@tanstack/react-query";
import { requestsService } from "../services/requestsService";
import type { RequestFilters } from "../services/requestsService/getAll";

export function useRequests(
  filters: RequestFilters,
  page: number,
  perPage: number,
) {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["requests", filters, page, perPage],
    queryFn: () => requestsService.getAll({ ...filters, page, perPage }),
    staleTime: Infinity,
  });

  return {
    request: data?.data ?? [],
    totalCount: data?.totalCount,
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetchExchanges: refetch,
  };
}
