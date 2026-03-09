import { create } from "./create";
import { createAdmin } from "./createAdmin";
import { getAbuseReports } from "./getAbuseReports";
import { getAll } from "./getAll";
import { getAnalytics } from "./getAnalytics";
import { getProtocol } from "./getProtocol";
import { remove } from "./remove";
import { update } from "./update";

export const requestsService = {
  create,
  createAdmin,
  getAll,
  getAnalytics,
  getProtocol,
  getAbuseReports,
  update,
  remove,
};
