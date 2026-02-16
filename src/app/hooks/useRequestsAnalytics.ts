import { useQuery } from "@tanstack/react-query";
import { requestsService } from "../services/requestsService";
import type { RequestAnalyticsParams } from "../services/requestsService/getAnalytics";

export function useRequestsAnalytics(params: RequestAnalyticsParams) {
  const { data, isFetching, isLoading, refetch, isError } = useQuery({
    queryKey: ["requests", "analytics", params],
    queryFn: () => requestsService.getAnalytics({ ...params }),
    staleTime: Infinity,
  });

  return {
    requestAnalytics: data ?? null,
    totalCount: data?.summary.total ?? 0,
    isLoadingAnalytics: isFetching,
    isInitialLoadingAnalytics: isLoading,
    isErrorAnalytics: isError,
    refetchAnalytics: refetch,
  };
}
