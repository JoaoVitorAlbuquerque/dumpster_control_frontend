import { httpClient } from "../httpClient";

export interface RequestAbuseReportsParams {
  year: number;
}

export async function getAbuseReports(params: RequestAbuseReportsParams) {
  const { data } = await httpClient.get("/requests/abuse", {
    params,
  });

  return data;
}
