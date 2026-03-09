import { useQuery } from "@tanstack/react-query";
import { requestsService } from "../services/requestsService";

export function useAbuseReports(year: number) {
  const { data, isFetching, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["abuse-reports", year],
    queryFn: async () => {
      const data = await requestsService.getAbuseReports({
        year,
      });
      return data;
    },
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
  });

  console.log("Dados de abuso:", data);
  console.log(error);

  return {
    abuseReportData: data ?? null,
    isinitialLoadingAbuseReport: isFetching,
    isLoadingAbuseReport: isLoading,
    isErrorAbuseReport: isError,
    refetchAbuseReport: refetch,
  };
}
