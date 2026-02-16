import { httpClient } from "../httpClient";

export interface RequestAnalyticsParams {
  startDate?: string;
  endDate?: string;
  bucket?: "day" | "week" | "month";
}

export async function getAnalytics(params: RequestAnalyticsParams) {
  const { data } = await httpClient.get("/requests/analytics", {
    params,
  });

  return data;
}
